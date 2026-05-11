import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { id: post.id }
  }));
}

export async function GET({ params }: { params: { id: string } }) {
  const posts = await getCollection('posts');
  const cleanId = params.id.replace(/\.html$/, '');
  const post = posts.find(p => p.id === cleanId);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  try {
    const container = await experimental_AstroContainer.create();
    const { Content } = await render(post);
    const html = await container.renderToString(Content);

    const wrappedHtml = `<div id="preview-wrapper" data-title="${escapeHtml(post.data.title)}" data-date="${post.data.date}">${html}</div>`;

    return new Response(wrappedHtml, {
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (e) {
    return new Response(`Rendering failed: ${(e as Error).message}`, { status: 500 });
  }
}
