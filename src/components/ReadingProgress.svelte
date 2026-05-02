<script lang="ts">
  import { onMount } from 'svelte';

  let progress = 0;

  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      progress = 0;
      return;
    }
    progress = (window.scrollY / scrollHeight) * 100;
  }

  onMount(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  });
</script>

<div class="progress-container">
  <div class="progress-bar" style="width: {progress}%"></div>
</div>

<style>
  .progress-container {
    position: fixed;
    top: 60px; /* Right below the header */
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 101; /* Above header (100) */
    pointer-events: none;
    background: transparent;
  }

  .progress-bar {
    height: 100%;
    background: var(--primary-color);
    box-shadow: 0 0 10px color-mix(in srgb, var(--primary-color) 40%, transparent);
    transition: width 0.1s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 0 999px 999px 0;
  }

  @media (max-width: 768px) {
    .progress-container {
      top: 60px;
    }
  }
</style>
