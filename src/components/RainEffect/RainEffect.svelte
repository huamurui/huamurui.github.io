<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { loadImages, random, times } from './rain-utils';
  import { Raindrops } from './raindrops';
  import { RainRenderer } from './rain-renderer';

  const IMG = '/rain-effect/img';

  let enabled = $state(true);
  let containerEl: HTMLDivElement | undefined = $state();
  let canvasEl: HTMLCanvasElement | undefined = $state();

  let rain: Raindrops | null = null;
  let renderer: RainRenderer | null = null;
  let ptrHandler: ((e: PointerEvent) => void) | null = null;

  let scrollTimeout: number | null = null;
  let isCapturing = false;

  async function captureScreen(init = false): Promise<{ fg: HTMLCanvasElement, bg: HTMLCanvasElement } | null> {
    if (!canvasEl || isCapturing) return null;
    isCapturing = true;

    try {
      const { toCanvas } = await import('html-to-image');
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Hide rain container to capture a clean screenshot
      const oldDisplay = containerEl ? containerEl.style.display : '';
      if (containerEl) containerEl.style.display = 'none';

      // We clone the document body and use transform to only render the viewport.
      const canvas = await toCanvas(document.body, {
        filter: (node) => {
          if (node instanceof HTMLElement) {
            return !(node.classList?.contains('rain-container') || node.classList?.contains('rain-toggle'));
          }
          return true;
        },
        pixelRatio: dpr,
        width: vw,
        height: vh,
        style: {
          transform: `translate(-${window.scrollX}px, -${window.scrollY}px)`,
          transformOrigin: 'top left',
          width: `${document.documentElement.scrollWidth}px`,
          height: `${document.documentElement.scrollHeight}px`
        },
        backgroundColor: getComputedStyle(document.body).backgroundColor || '#111'
      });

      if (containerEl) containerEl.style.display = oldDisplay;

      if (!init && renderer) {
        // bg is no longer used or needed since WebGL canvas is transparent
        renderer.updateTextures(canvas, canvas);
      }
      return { fg: canvas, bg: canvas };
    } catch (e) {
      console.warn('[RainEffect] Screenshot failed', e);
      return null;
    } finally {
      isCapturing = false;
    }
  }

  function handleScroll() {
    if (scrollTimeout !== null) clearTimeout(scrollTimeout);
    scrollTimeout = window.setTimeout(() => {
      if (enabled) captureScreen();
    }, 200);
  }

  async function startRain() {
    if (!canvasEl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    canvasEl.width = vw * dpr;
    canvasEl.height = vh * dpr;

    const [images, screens] = await Promise.all([
      loadImages([
        { name: 'dropShine', src: `${IMG}/drop-shine2.png` },
        { name: 'dropAlpha', src: `${IMG}/drop-alpha.png` },
        { name: 'dropColor', src: `${IMG}/drop-color.png` },
      ]),
      captureScreen(true)
    ]);

    if (!screens) return;

    // Canvas 2D particle simulation (index2 style: slow, atmospheric)
    rain = new Raindrops(
      canvasEl.width, canvasEl.height, dpr,
      images.dropAlpha.img, images.dropColor.img,
      {
        minR: 20, maxR: 60,
        rainChance: 0.3, rainLimit: 10,
        dropletsRate: 0,
        globalTimeScale: 0.45,
        autoShrink: false,
        spawnArea: [-0.3, 0.3],
        dropFallMultiplier: 0.2,
        trailRate: 1.1,
        trailScaleRange: [0.2, 0.35],
        collisionRadius: 0.45,
        collisionRadiusIncrease: 0,
        collisionBoost: 0.35,
        collisionBoostMultiplier: 0.025,
      },
    );

    // Pre-seed some initial drops
    times(80, () => {
      if (!rain) return;
      const drop = rain.createDrop({
        x: random(canvasEl!.width / dpr),
        y: random(canvasEl!.height / dpr),
        r: random(10, 20),
      });
      if (drop) rain.addDrop(drop);
    });

    // WebGL refraction renderer
    try {
      renderer = new RainRenderer(canvasEl, {
        liquid: rain.canvas,
        textureFg: screens.fg,
        textureBg: screens.fg,
        textureShine: images.dropShine.img,
      }, {
        minRefraction: 10, maxRefraction: 50,
        alphaMultiply: 7, alphaSubtract: 3,
        renderShine: true, renderShadow: true,
      });
      renderer.start();
    } catch (err) {
      console.warn('[RainEffect] WebGL init failed:', err);
      return;
    }

    // Mouse parallax
    ptrHandler = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
      renderer?.setParallax(nx, ny);
    };
    window.addEventListener('pointermove', ptrHandler, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
  }

  function stopRain() {
    if (ptrHandler) {
      window.removeEventListener('pointermove', ptrHandler);
      ptrHandler = null;
    }
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
    if (scrollTimeout !== null) clearTimeout(scrollTimeout);
    renderer?.dispose();
    renderer = null;
    rain?.stop();
    rain = null;
  }

  function toggle() {
    enabled = !enabled;
    if (enabled) {
      startRain();
    } else {
      stopRain();
    }
  }

  onMount(() => {
    if (enabled) startRain();
  });

  onDestroy(() => {
    stopRain();
  });
</script>

{#if enabled}
  <div class="rain-container" bind:this={containerEl}>
    <canvas class="rain-canvas" bind:this={canvasEl}></canvas>
  </div>
{/if}

<button
  class="rain-toggle"
  onclick={toggle}
  title={enabled ? '关闭雨滴效果' : '开启雨滴效果'}
  aria-label={enabled ? '关闭雨滴效果' : '开启雨滴效果'}
>
  {enabled ? '🌧️' : '☀️'}
</button>

<style>
  .rain-container {
    position: fixed;
    inset: 0;
    z-index: 9990;
    pointer-events: none;
    touch-action: none;
  }

  .rain-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .rain-toggle {
    position: fixed;
    bottom: 5rem;
    right: 1.5rem;
    z-index: 9999;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid rgba(128, 128, 128, 0.3);
    background: rgba(30, 30, 30, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .rain-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .rain-toggle:active {
    transform: scale(0.95);
  }
</style>
