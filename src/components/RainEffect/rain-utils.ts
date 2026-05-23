/**
 * Rain effect utility functions.
 * Extracted from Codrops Rain & Water Effect (Lucas Bebber).
 */

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function random(
  from: number | null = null,
  to: number | null = null,
  interpolation: ((n: number) => number) | null = null,
): number {
  let f = from;
  let t = to;
  if (f == null) {
    f = 0;
    t = 1;
  } else if (f != null && t == null) {
    t = f;
    f = 0;
  }
  const delta = (t ?? 0) - (f ?? 0);
  const interp = interpolation ?? ((n: number) => n);
  return (f ?? 0) + interp(Math.random()) * delta;
}

export function chance(c: number): boolean {
  return random() <= c;
}

export function times(n: number, f: (i: number) => void): void {
  for (let i = 0; i < n; i++) {
    f(i);
  }
}

export type ImageEntry = { name: string; src: string };
type LoadedImages = Record<string, { img: HTMLImageElement; src: string }>;

export function loadImages(images: ImageEntry[]): Promise<LoadedImages> {
  return Promise.all(
    images.map(
      (entry) =>
        new Promise<{ name: string; img: HTMLImageElement; src: string }>((resolve) => {
          const img = new Image();
          img.addEventListener('load', () => resolve({ name: entry.name, img, src: entry.src }));
          img.src = entry.src;
        }),
    ),
  ).then((loaded) => {
    const result: LoadedImages = {};
    for (const item of loaded) {
      result[item.name] = { img: item.img, src: item.src };
    }
    return result;
  });
}
