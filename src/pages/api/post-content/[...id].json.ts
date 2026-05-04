import { getCollection, render } from 'astro:content';
// Use the physical path which is more reliable in endpoints
import { experimental_AstroContainer } from 'astro/container';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { id: post.id }
  }));
}

export async function GET({ params }: { params: { id: string } }) {
  const posts = await getCollection('posts');
  const cleanId = params.id.replace(/\.json$/, '');
  const post = posts.find(p => p.id === cleanId);

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found', id: cleanId }), { status: 404 });
  }

  try {
    const container = await experimental_AstroContainer.create();
    const { Content } = await render(post);
    const html = await container.renderToString(Content);

    return new Response(JSON.stringify({
      title: post.data.title,
      html: html,
      date: post.data.date
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Disable server-side cache during testing
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ 
      error: 'Rendering failed', 
      message: (e as Error).message,
      stack: (e as Error).stack 
    }), { status: 500 });
  }
}
