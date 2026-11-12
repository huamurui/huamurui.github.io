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
