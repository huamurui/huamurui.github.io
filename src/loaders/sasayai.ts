import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { Loader } from 'astro/loaders'
import { parseSasayai } from '../utils/parse-sasayai.mjs'

export function sasayaiLoader(): Loader {
  return {
    name: 'sasayai-loader',
    async load({ config, store, parseData, renderMarkdown, watcher, logger }) {
      const fileURL = new URL('./src/data/sasayai.md', config.root)
      const filePath = fileURLToPath(fileURL)
      let pending = Promise.resolve()

      async function refresh() {
        const entries = parseSasayai(await readFile(fileURL, 'utf8'))
        // Do not replace the previous collection until all entries render successfully.
        const renderedEntries = await Promise.all(entries.map(async entry => {
          const data = await parseData({ id: entry.id, data: {
            id: entry.id, date: entry.date, tags: entry.tags
          } })
          const rendered = await renderMarkdown(entry.content, { fileURL })
          return { id: entry.id, data, body: entry.content, rendered,
            filePath: 'src/data/sasayai.md', assetImports: rendered.metadata?.imagePaths }
        }))
        store.clear()
        for (const entry of renderedEntries) store.set(entry)
      }

      await refresh()
      watcher?.on('change', changedPath => {
        if (changedPath !== filePath) return
        pending = pending.then(refresh).catch(error => {
          logger.error(`Failed to load Sasayai: ${error instanceof Error ? error.message : String(error)}`)
        })
      })
    }
  }
}
