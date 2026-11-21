import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import test from 'node:test'
import { parseFrontmatter, unified } from '@astrojs/markdown-remark'
import { sasayaiLoader } from '../src/loaders/sasayai.ts'
import { parseSasayai } from '../src/utils/parse-sasayai.mjs'
import { buildBacklinks } from '../scripts/build-backlinks.mjs'
import { createPostIdMap, createPostPathData, resolveLocalPostId } from '../scripts/post-paths.mjs'

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pudding-scripts-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  return dir
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

function scriptFixture(t) {
  const dir = fixture(t)
  const root = path.join(dir, 'repository')
  const cwd = path.join(dir, 'unrelated')
  const repository = fileURLToPath(new URL('../', import.meta.url))
  fs.mkdirSync(path.join(root, 'scripts'), { recursive: true })
  fs.mkdirSync(cwd)
  fs.symlinkSync(path.join(repository, 'node_modules'), path.join(root, 'node_modules'), 'dir')
  for (const script of ['build-backlinks.mjs', 'post-paths.mjs']) {
    fs.copyFileSync(path.join(repository, 'scripts', script), path.join(root, 'scripts', script))
  }
  return { root, cwd }
}

test('sasayai parses top-level note comments while preserving Markdown and tags', () => {
  const entries = parseSasayai(`<!-- note: 2026-11-03T14:42:00+08:00; tags: 开发, 随笔 -->

## Heading

\`\`\`html
<!-- note: 2026-01-01T00:00:00Z -->
\`\`\`

> <!-- note: 2026-01-02T00:00:00Z -->

<!-- note: 2026-11-02T23:10:00+08:00 -->

Second entry
`)
  assert.deepEqual(entries.map(entry => entry.id), ['20261103064200', '20261102151000'])
  assert.deepEqual(entries[0].tags, ['开发', '随笔'])
  assert.match(entries[0].content, /## Heading/)
  assert.match(entries[0].content, /<!-- note: 2026-01-01T00:00:00Z -->/)
})

test('sasayai rejects invalid or duplicate timestamps', () => {
  const valid = '<!-- note: 2026-05-11T20:00:00Z -->\n\nhello\n'
  for (const source of [
    'unexpected content',
    '<!-- note: invalid -->\n\nhello',
    '<!-- note: 2026-02-30T20:00:00Z -->\n\nhello',
    '<!-- note: 2026-05-11T20:00:00 -->\n\nhello',
    '<!-- note: 2026-05-11T20:00:00Z -->',
    valid + '\n<!-- note: 2026-05-12T04:00:00+08:00 -->\n\nduplicate'
  ]) assert.throws(() => parseSasayai(source))
})

test('sasayai renders leading Markdown rules as body content rather than frontmatter', async t => {
  const root = fixture(t)
  const body = '---\nA thought\n---\n\nThe rest'
  write(path.join(root, 'src/data/sasayai.md'), `<!-- note: 2026-11-21T00:00:00Z -->\n\n${body}`)
  const entries = new Map()
  const renderer = await unified({}).createRenderer({})
  await sasayaiLoader().load({
    config: { root: pathToFileURL(`${root}${path.sep}`) },
    store: { clear: () => entries.clear(), set: entry => entries.set(entry.id, entry) },
    parseData: async({ data }) => data,
    renderMarkdown: async(source, options) => {
      const { content } = parseFrontmatter(source)
      const { code, metadata } = await renderer.render(content, options)
      return { html: code, metadata }
    }
  })
  const entry = [...entries.values()][0]
  assert.equal(entry.body, body)
  assert.match(entry.rendered.html, /<hr>/)
  assert.match(entry.rendered.html, /<h2[^>]*>A thought<\/h2>/)
  assert.match(entry.rendered.html, /<p>The rest<\/p>/)
})

test('backlinks resolve existing local posts, references, encodings and root article URLs', t => {
  const dir = fixture(t)
  const postsDir = path.join(dir, 'posts')
  const outputFile = path.join(dir, 'cache/backlinks.json')
  write(path.join(postsDir, 'tech/target.md'), '---\ntitle: Target\n---\nBody')
  write(path.join(postsDir, 'tech/空间.md'), 'Space')
  write(path.join(postsDir, '__proto__.md'), 'Prototype')
  write(path.join(postsDir, 'diary/source.md'), `---
title: "[not a link](../tech/target)"
---
[inline](../tech/target.md?view=1#heading)
[duplicate](/posts/tech/target/)
[root](/tech/target.html)
[reference][target]
[encoded](../tech/%E7%A9%BA%E9%97%B4#heading)
[prototype](../__proto__)
[self](./source)
[anchor](#heading)
[query](?view=1)
[external](HTTPS://example.com/posts/tech/target)
[protocol relative](//example.com/posts/tech/target)
[email](mailto:someone@example.com)
[non-http scheme](ftp://example.com/posts/tech/target)
[missing](../tech/missing)
[outside](../../posts-other/target.md)
[invalid](../tech/%broken)
![image](../tech/target.md)

[target]: ../tech/target
`)
  write(path.join(postsDir, 'frontmatter-only.md'), '---\ntitle: "[hidden](tech/target)"\n---\nNo links')
  write(path.join(dir, 'posts-other/target.md'), 'Outside')
  const expected = Object.fromEntries([
    ['__proto__', ['diary/source']],
    ['tech/target', ['diary/source']],
    ['tech/空间', ['diary/source']]
  ])
  assert.deepEqual(buildBacklinks({ postsDir, outputFile }), expected)
  assert.deepEqual(JSON.parse(fs.readFileSync(outputFile, 'utf8')), expected)
  assert.deepEqual(fs.readdirSync(path.dirname(outputFile)), ['backlinks.json'])
})

test('backlinks failures preserve the existing output', t => {
  const dir = fixture(t)
  const outputFile = path.join(dir, 'backlinks.json')
  write(outputFile, '{"previous": []}')
  assert.throws(() => buildBacklinks({ postsDir: path.join(dir, 'missing'), outputFile }))
  assert.equal(fs.readFileSync(outputFile, 'utf8'), '{"previous": []}')
})

test('post IDs and backlinks follow Astro slug, custom slug and nested index rules', t => {
  const dir = fixture(t)
  const postsDir = path.join(dir, 'posts')
  const outputFile = path.join(dir, 'backlinks.json')
  const sourceFile = path.join(postsDir, 'From Source.md')
  write(path.join(postsDir, 'tech/Hello World.md'), 'Hello')
  write(path.join(postsDir, 'guide/index.md'), 'Guide')
  write(path.join(postsDir, 'renamed.md'), '---\nslug: custom-slug\n---\nRenamed')
  write(sourceFile, `[name](./tech/Hello%20World.md)
[index](./guide/)
[custom source](./renamed.md)
[custom route](/posts/custom-slug/)
[slug route](/posts/tech/hello-world/)
`)
  assert.deepEqual(buildBacklinks({ postsDir, outputFile }), {
    'tech/hello-world': ['from-source'],
    guide: ['from-source'],
    'custom-slug': ['from-source']
  })
  const ids = createPostIdMap(postsDir)
  assert.equal(resolveLocalPostId('/blog/posts/custom-slug/?view=1#title', sourceFile, ids, {
    postsDir, base: '/blog'
  }), 'custom-slug')
  assert.equal(resolveLocalPostId('/posts/guide/index.html', sourceFile, ids, { postsDir }), 'guide')
  write(path.join(postsDir, 'duplicate.md'), '---\nslug: custom-slug\n---\nDuplicate')
  assert.throws(() => createPostIdMap(postsDir), /Duplicate article ID/)
})

test('post metadata distinguishes drafts and backlinks exclude draft sources and targets', t => {
  const dir = fixture(t)
  const postsDir = path.join(dir, 'posts')
  const outputFile = path.join(dir, 'backlinks.json')
  const publishedPath = path.join(postsDir, 'public.md')
  const draftPath = path.join(postsDir, 'draft.md')
  write(publishedPath, '[draft](./draft.md)')
  write(draftPath, '---\ndraft: true\nslug: hidden\n---\n[public](./public.md)')
  const { postIds, draftIds } = createPostPathData(postsDir)
  assert.equal(postIds.get(draftPath), 'hidden')
  assert.deepEqual([...draftIds], ['hidden'])
  assert.equal(resolveLocalPostId('./draft.md', publishedPath, postIds, { postsDir }), 'hidden')
  assert.deepEqual(buildBacklinks({ postsDir, outputFile }), {})
})

test('generators resolve repository paths when invoked from another directory', t => {
  const { root, cwd } = scriptFixture(t)
  write(path.join(root, 'src/posts/example.md'), 'Example')
  for (const script of ['build-backlinks.mjs']) {
    const result = spawnSync(process.execPath, [path.join(root, 'scripts', script)], { cwd, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
    assert.equal(fs.existsSync(path.join(cwd, '.cache')), false)
  }
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, '.cache/backlinks.json'), 'utf8')), {})
})

test('generator CLI failures return a nonzero status', t => {
  const { root, cwd } = scriptFixture(t)
  for (const script of ['build-backlinks.mjs']) {
    const result = spawnSync(process.execPath, [path.join(root, 'scripts', script)], { cwd, encoding: 'utf8' })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /Failed to generate/)
  }
})
