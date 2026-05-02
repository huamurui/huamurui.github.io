<script lang="ts">
  import { onMount } from 'svelte';

  // Placeholder for Giscus config - User can fill this later
  const giscusConfig = {
    repo: "huamurui/huamurui.github.io",
    repoId: "R_kgDOHFCWEQ",
    category: "Announcements",
    categoryId: "DIC_kwDOHFCWEc4CR0iI",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "bottom",
    lang: "zh-CN",
    loading: "lazy"
  };

  function updateGiscusTheme() {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }

  onMount(() => {
    const script = document.createElement('script');
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    
    Object.entries({
      ...giscusConfig,
      theme,
      crossorigin: "anonymous",
      async: "true"
    }).forEach(([key, value]) => {
      script.setAttribute(`data-${key}`, value);
    });

    script.src = "https://giscus.app/client.js";
    const container = document.getElementById('giscus-container');
    if (container) container.appendChild(script);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateGiscusTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  });
</script>

<div class="comments-section">
  <div id="giscus-container"></div>
</div>

<style>
  .comments-section {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
  }
</style>
