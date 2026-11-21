export function decodeGitHubFile(content: string): string {
  const bytes = Uint8Array.from(atob(content.replace(/\s/g, '')), character => character.charCodeAt(0))
  const source = new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  if (source.trim() && !/^\s*<!--\s*note:\s*\S+.*?-->\s*(?:\r?\n|$)/.test(source)) {
    throw new Error('源文件格式不正确，已取消更新')
  }
  return source
}

export function encodeGitHubFile(source: string): string {
  const bytes = new TextEncoder().encode(source)
  // Avoid spread argument limits when the archive grows large.
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/** Validate the complete archive before publishing author-supplied Markdown. */
export async function prepareSasayaiUpdate(
  source: string,
  content: string,
  timestamp = new Date().toISOString()
): Promise<string> {
  // Publishing is rare; ordinary readers do not need to download the Markdown parser.
  const { parseSasayai } = await import('../utils/parse-sasayai.mjs')
  const body = content.trim()
  if (!body) throw new Error('絮语内容不能为空')
  const previous = parseSasayai(source)
  const updated = `<!-- note: ${timestamp} -->\n\n${body}\n\n${source}`
  const entries = parseSasayai(updated)
  if (entries.length !== previous.length + 1 || entries[0].content !== body
    || previous.some((entry, index) => entries[index + 1].id !== entry.id
      || entries[index + 1].content !== entry.content)) {
    throw new Error('絮语内容不能包含顶层 note 标记或影响其他记录的未闭合 Markdown')
  }
  return updated
}
