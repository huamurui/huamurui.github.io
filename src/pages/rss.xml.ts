import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getPublishedPosts } from '@/utils/content'
import { siteConfig } from '@/config/site.config'
import { buildUrl, extractExcerptFromMarkdown, getPostUrl } from '@/utils/helpers'

export const GET:APIRoute = async(context) => {
  const blog = (await getPublishedPosts()).sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.url || '',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || extractExcerptFromMarkdown(post.body || ''),
      link: getPostUrl(post.id)
    })),
    customData: '<language>zh-cn</language>',
    stylesheet: buildUrl('rss.xsl')
  })
}
