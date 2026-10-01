import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))

export function generateSasayai({
  jsonPath = path.join(root, 'src/data/sasayai.json'),
  cacheDir = path.join(root, '.cache/sasayai')
} = {}) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  if (!Array.isArray(data)) throw new Error('Sasayai source must be a JSON array')

  const ids = new Set()
  // Validate every entry before replacing the last successful generation.
  const entries = data.map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error(`Sasayai entry ${index + 1} must be an object`)
    }
    if (typeof item.date !== 'string' || !Number.isFinite(Date.parse(item.date))) {
      throw new Error(`Sasayai entry ${index + 1} has an invalid date`)
    }
    if (typeof item.content !== 'string') {
      throw new Error(`Sasayai entry ${index + 1} must have string content`)
    }
    const date = new Date(item.date).toISOString()
    const id = item.id ?? `entry-${createHash('sha256').update(`${date}\n${item.content}`).digest('hex').slice(0, 24)}`
    if (typeof id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(id)) {
      throw new Error(`Sasayai entry ${index + 1} has an invalid ID; use letters, digits, hyphens or underscores`)
    }
    // Also prevent overwrites on case-insensitive filesystems.
    if (ids.has(id.toLowerCase())) throw new Error(`Duplicate sasayai ID: ${id}`)
    ids.add(id.toLowerCase())
    return { id, date, content: item.content }
  })

  fs.mkdirSync(path.dirname(cacheDir), { recursive: true })
  const staging = fs.mkdtempSync(path.join(path.dirname(cacheDir), '.sasayai-'))
  const previous = `${staging}.previous`
  try {
    for (const item of entries) {
      const content = `---\ndate: ${JSON.stringify(item.date)}\nid: ${JSON.stringify(item.id)}\n---\n${item.content}\n`
      fs.writeFileSync(path.join(staging, `${item.id}.md`), content)
    }
    if (fs.existsSync(cacheDir)) fs.renameSync(cacheDir, previous)
    try {
      fs.renameSync(staging, cacheDir)
    } catch (error) {
      if (fs.existsSync(previous)) fs.renameSync(previous, cacheDir)
      throw error
    }
    fs.rmSync(previous, { recursive: true, force: true })
  } finally {
    fs.rmSync(staging, { recursive: true, force: true })
  }
  return entries.length
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const count = generateSasayai()
    console.log(`Successfully generated ${count} sasayai files`)
  } catch (error) {
    console.error(`Failed to generate sasayai: ${error.message}`)
    process.exitCode = 1
  }
}
