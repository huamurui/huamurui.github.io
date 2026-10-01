export interface Whisper {
  id: string
  date: string
  content: string
}

export function decodeGitHubFile(content: string): Whisper[] {
  const bytes = Uint8Array.from(atob(content.replace(/\s/g, '')), character => character.charCodeAt(0))
  const data: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes))
  if (!Array.isArray(data) || data.some(item => !item || typeof item.id !== 'string'
    || typeof item.date !== 'string' || typeof item.content !== 'string')) {
    throw new Error('源文件格式不正确，已取消更新')
  }
  return data as Whisper[]
}

export function encodeGitHubFile(data: Whisper[]): string {
  const bytes = new TextEncoder().encode(JSON.stringify(data, null, 2))
  // Avoid spread argument limits when the archive grows large.
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}
