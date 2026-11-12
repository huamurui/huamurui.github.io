import { remark } from 'remark'

const parser = remark()

export function parseSasayai(source) {
  const tree = parser.parse(source)
  const markers = []
  for (const node of tree.children) {
    if (node.type !== 'html' || !/^<!--\s*note\s*:/i.test(node.value)) continue
    const match = /^<!--\s*note:\s*(\S+?)(?:\s*;\s*tags:\s*([^\n]*?))?\s*-->$/i.exec(node.value)
    if (!match) throw new Error(`Invalid sasayai marker at line ${node.position.start.line}`)
    const timestamp = match[1]
    // Require an explicit timezone and a real calendar date, independent of the build machine.
    const parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-]\d{2}:\d{2})$/.exec(timestamp)
    if (!parts || !Number.isFinite(Date.parse(timestamp))) throw new Error(`Invalid sasayai timestamp: ${timestamp}`)
    const [, year, month, day, hour, minute, second, , zone] = parts
    const calendar = new Date(Date.UTC(+year, +month - 1, +day))
    if (calendar.getUTCFullYear() !== +year || calendar.getUTCMonth() !== +month - 1 || calendar.getUTCDate() !== +day || +hour > 23 || +minute > 59 || +second > 59 || (zone !== 'Z' && (+zone.slice(1, 3) > 23 || +zone.slice(4) > 59))) {
      throw new Error(`Invalid sasayai timestamp: ${timestamp}`)
    }
    const date = new Date(timestamp).toISOString()
    const id = date.replace(/[-:T.Z]/g, '').replace(/000$/, '')
    const tags = match[2] ? match[2].split(',').map(tag => tag.trim()).filter(Boolean) : []
    markers.push({ start: node.position.start.offset, end: node.position.end.offset, date, id, tags })
  }
  if (source.slice(0, markers[0]?.start ?? source.length).trim()) throw new Error('Sasayai content must start with a note marker')
  const ids = new Set()
  return markers.map((marker, index) => {
    if (ids.has(marker.id)) throw new Error(`Duplicate sasayai timestamp: ${marker.date}`)
    ids.add(marker.id)
    const content = source.slice(marker.end, markers[index + 1]?.start ?? source.length).trim()
    if (!content) throw new Error(`Empty sasayai entry: ${marker.date}`)
    return { ...marker, content }
  })
}
