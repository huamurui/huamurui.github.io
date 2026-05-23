/**
 * Canvas 2D raindrop particle system.
 * Generates a "liquid height map" canvas where R=y offset, G=x offset, B=depth, A=presence.
 * Based on Codrops Rain & Water Effect (Lucas Bebber).
 */
import { createCanvas, random, chance, times } from './rain-utils';

const DROP_SIZE = 64;

interface Drop {
  x: number; y: number; r: number;
  spreadX: number; spreadY: number;
  momentum: number; momentumX: number;
  lastSpawn: number; nextSpawn: number;
  parent: Drop | null; isNew: boolean; killed: boolean; shrink: number;
}

function newDrop(o: Partial<Drop> = {}): Drop {
  return { x:0, y:0, r:0, spreadX:0, spreadY:0, momentum:0, momentumX:0,
    lastSpawn:0, nextSpawn:0, parent:null, isNew:true, killed:false, shrink:0, ...o };
}

export interface RaindropsOptions {
  minR: number; maxR: number; maxDrops: number;
  rainChance: number; rainLimit: number;
  dropletsRate: number; dropletsSize: [number, number];
  dropletsCleaningRadiusMultiplier: number;
  raining: boolean; globalTimeScale: number; trailRate: number;
  autoShrink: boolean; spawnArea: [number, number];
  trailScaleRange: [number, number];
  collisionRadius: number; collisionRadiusIncrease: number;
  dropFallMultiplier: number;
  collisionBoostMultiplier: number; collisionBoost: number;
}

const DEFAULTS: RaindropsOptions = {
  minR:10, maxR:40, maxDrops:900, rainChance:0.3, rainLimit:3,
  dropletsRate:50, dropletsSize:[2,4], dropletsCleaningRadiusMultiplier:0.43,
  raining:true, globalTimeScale:1, trailRate:1, autoShrink:true,
  spawnArea:[-0.1,0.95], trailScaleRange:[0.2,0.5],
  collisionRadius:0.65, collisionRadiusIncrease:0.01,
  dropFallMultiplier:1, collisionBoostMultiplier:0.05, collisionBoost:1,
};

export class Raindrops {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private droplets: HTMLCanvasElement;
  private dropletsCtx: CanvasRenderingContext2D;
  private dropletsPixelDensity = 1;
  private dropletsCounter = 0;
  private drops: Drop[] = [];
  private dropsGfx: HTMLCanvasElement[] = [];
  private clearDropletsGfx!: HTMLCanvasElement;
  private textureCleaningIterations = 0;
  private lastRender: number | null = null;
  private rafId = 0;
  private stopped = false;
  private width: number; private height: number; private scale: number;
  private dropAlpha: CanvasImageSource; private dropColor: CanvasImageSource;
  options: RaindropsOptions;

  constructor(w: number, h: number, scale: number,
    dropAlpha: CanvasImageSource, dropColor: CanvasImageSource,
    opts: Partial<RaindropsOptions> = {}) {
    this.width = w; this.height = h; this.scale = scale;
    this.dropAlpha = dropAlpha; this.dropColor = dropColor;
    this.options = { ...DEFAULTS, ...opts };
    this.canvas = createCanvas(w, h);
    this.ctx = this.canvas.getContext('2d')!;
    this.droplets = createCanvas(w * this.dropletsPixelDensity, h * this.dropletsPixelDensity);
    this.dropletsCtx = this.droplets.getContext('2d')!;
    this.renderDropsGfx();
    this.update();
  }

  private get deltaR() { return this.options.maxR - this.options.minR; }
  private get area() { return (this.width * this.height) / this.scale; }
  private get areaMultiplier() { return Math.sqrt(this.area / (1024 * 768)); }

  private renderDropsGfx() {
    const buf = createCanvas(DROP_SIZE, DROP_SIZE);
    const bCtx = buf.getContext('2d')!;
    this.dropsGfx = Array.from({ length: 255 }, (_, i) => {
      const d = createCanvas(DROP_SIZE, DROP_SIZE);
      const dCtx = d.getContext('2d')!;
      bCtx.clearRect(0, 0, DROP_SIZE, DROP_SIZE);
      bCtx.globalCompositeOperation = 'source-over';
      bCtx.drawImage(this.dropColor, 0, 0, DROP_SIZE, DROP_SIZE);
      bCtx.globalCompositeOperation = 'screen';
      bCtx.fillStyle = `rgba(0,0,${i},1)`;
      bCtx.fillRect(0, 0, DROP_SIZE, DROP_SIZE);
      dCtx.globalCompositeOperation = 'source-over';
      dCtx.drawImage(this.dropAlpha, 0, 0, DROP_SIZE, DROP_SIZE);
      dCtx.globalCompositeOperation = 'source-in';
      dCtx.drawImage(buf, 0, 0, DROP_SIZE, DROP_SIZE);
      return d;
    });
    this.clearDropletsGfx = createCanvas(128, 128);
    const cc = this.clearDropletsGfx.getContext('2d')!;
    cc.fillStyle = '#000';
    cc.beginPath(); cc.arc(64, 64, 64, 0, Math.PI * 2); cc.fill();
  }

  private drawDrop(ctx: CanvasRenderingContext2D, drop: Drop) {
    if (!this.dropsGfx.length) return;
    const sX = 1, sY = 1.5;
    let d = Math.max(0, Math.min(1, ((drop.r - this.options.minR) / this.deltaR) * 0.9));
    d *= 1 / ((drop.spreadX + drop.spreadY) * 0.5 + 1);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    const idx = Math.floor(d * (this.dropsGfx.length - 1));
    ctx.drawImage(this.dropsGfx[idx]!,
      (drop.x - drop.r * sX * (drop.spreadX + 1)) * this.scale,
      (drop.y - drop.r * sY * (drop.spreadY + 1)) * this.scale,
      drop.r * 2 * sX * (drop.spreadX + 1) * this.scale,
      drop.r * 2 * sY * (drop.spreadY + 1) * this.scale);
  }

  private drawDroplet(x: number, y: number, r: number) {
    this.drawDrop(this.dropletsCtx, newDrop({
      x: x * this.dropletsPixelDensity,
      y: y * this.dropletsPixelDensity,
      r: r * this.dropletsPixelDensity }));
  }

  private clearDropletsAt(x: number, y: number, r = 30) {
    const c = this.dropletsCtx;
    c.globalCompositeOperation = 'destination-out';
    c.drawImage(this.clearDropletsGfx,
      (x - r) * this.dropletsPixelDensity * this.scale,
      (y - r) * this.dropletsPixelDensity * this.scale,
      r * 2 * this.dropletsPixelDensity * this.scale,
      r * 2 * this.dropletsPixelDensity * this.scale * 1.5);
  }

  createDrop(o: Partial<Drop>): Drop | null {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier) return null;
    return newDrop(o);
  }

  addDrop(drop: Drop) {
    if (this.drops.length >= this.options.maxDrops * this.areaMultiplier) return false;
    this.drops.push(drop); return true;
  }

  private updateRain(ts: number): Drop[] {
    const r: Drop[] = [];
    if (!this.options.raining) return r;
    const limit = this.options.rainLimit * ts * this.areaMultiplier;
    let c = 0;
    while (chance(this.options.rainChance * ts * this.areaMultiplier) && c < limit) {
      c++;
      const radius = random(this.options.minR, this.options.maxR, n => Math.pow(n, 3));
      const d = this.createDrop({
        x: random(this.width / this.scale),
        y: random((this.height / this.scale) * this.options.spawnArea[0],
                  (this.height / this.scale) * this.options.spawnArea[1]),
        r: radius, momentum: 1 + (radius - this.options.minR) * 0.1 + random(2),
        spreadX: 1.5, spreadY: 1.5 });
      if (d) r.push(d);
    }
    return r;
  }

  private updateDroplets(ts: number) {
    if (this.textureCleaningIterations > 0) {
      this.textureCleaningIterations -= ts;
      this.dropletsCtx.globalCompositeOperation = 'destination-out';
      this.dropletsCtx.fillStyle = `rgba(0,0,0,${0.05 * ts})`;
      this.dropletsCtx.fillRect(0, 0,
        this.width * this.dropletsPixelDensity, this.height * this.dropletsPixelDensity);
    }
    if (this.options.raining) {
      this.dropletsCounter += this.options.dropletsRate * ts * this.areaMultiplier;
      times(this.dropletsCounter, () => {
        this.dropletsCounter--;
        this.drawDroplet(random(this.width / this.scale), random(this.height / this.scale),
          random(...this.options.dropletsSize, n => n * n));
      });
    }
    this.ctx.drawImage(this.droplets, 0, 0, this.width, this.height);
  }

  private updateDrops(ts: number) {
    let nd: Drop[] = [];
    this.updateDroplets(ts);
    nd = nd.concat(this.updateRain(ts));
    this.drops.sort((a, b) => {
      const va = a.y * (this.width / this.scale) + a.x;
      const vb = b.y * (this.width / this.scale) + b.x;
      return va > vb ? 1 : va === vb ? 0 : -1;
    });
    this.drops.forEach((drop, i) => {
      if (drop.killed) return;
      if (chance((drop.r - this.options.minR * this.options.dropFallMultiplier) * (0.1 / this.deltaR) * ts))
        drop.momentum += random((drop.r / this.options.maxR) * 4);
      if (this.options.autoShrink && drop.r <= this.options.minR && chance(0.05 * ts))
        drop.shrink += 0.01;
      drop.r -= drop.shrink * ts;
      if (drop.r <= 0) { drop.killed = true; return; }
      if (this.options.raining) {
        drop.lastSpawn += drop.momentum * ts * this.options.trailRate;
        if (drop.lastSpawn > drop.nextSpawn) {
          const td = this.createDrop({ x: drop.x + random(-drop.r, drop.r) * 0.1,
            y: drop.y - drop.r * 0.01,
            r: drop.r * random(...this.options.trailScaleRange),
            spreadY: drop.momentum * 0.1, parent: drop });
          if (td) {
            nd.push(td);
            drop.r *= Math.pow(0.97, ts); drop.lastSpawn = 0;
            drop.nextSpawn = random(this.options.minR, this.options.maxR) -
              drop.momentum * 2 * this.options.trailRate + (this.options.maxR - drop.r);
          }
        }
      }
      drop.spreadX *= Math.pow(0.4, ts);
      drop.spreadY *= Math.pow(0.7, ts);
      const moved = drop.momentum > 0;
      if (moved && !drop.killed) {
        drop.y += drop.momentum * this.options.globalTimeScale;
        drop.x += drop.momentumX * this.options.globalTimeScale;
        if (drop.y > this.height / this.scale + drop.r) drop.killed = true;
      }
      const chk = (moved || drop.isNew) && !drop.killed;
      drop.isNew = false;
      if (chk) {
        this.drops.slice(i + 1, i + 70).forEach(d2 => {
          if (drop !== d2 && drop.r > d2.r && drop.parent !== d2 && d2.parent !== drop && !d2.killed) {
            const dx = d2.x - drop.x, dy = d2.y - drop.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (drop.r + d2.r) * (this.options.collisionRadius + drop.momentum * this.options.collisionRadiusIncrease * ts)) {
              const a1 = Math.PI * drop.r * drop.r, a2 = Math.PI * d2.r * d2.r;
              let tR = Math.sqrt((a1 + a2 * 0.8) / Math.PI);
              if (tR > this.options.maxR) tR = this.options.maxR;
              drop.r = tR; drop.momentumX += dx * 0.1;
              drop.spreadX = 0; drop.spreadY = 0; d2.killed = true;
              drop.momentum = Math.max(d2.momentum,
                Math.min(40, drop.momentum + tR * this.options.collisionBoostMultiplier + this.options.collisionBoost));
            }
          }
        });
      }
      drop.momentum -= Math.max(1, this.options.minR * 0.5 - drop.momentum) * 0.1 * ts;
      if (drop.momentum < 0) drop.momentum = 0;
      drop.momentumX *= Math.pow(0.7, ts);
      if (!drop.killed) {
        nd.push(drop);
        if (moved && this.options.dropletsRate > 0)
          this.clearDropletsAt(drop.x, drop.y, drop.r * this.options.dropletsCleaningRadiusMultiplier);
        this.drawDrop(this.ctx, drop);
      }
    });
    this.drops = nd;
  }

  private update = () => {
    if (this.stopped) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    const now = Date.now();
    if (this.lastRender == null) this.lastRender = now;
    let ts = (now - this.lastRender) / ((1 / 60) * 1000);
    if (ts > 1.1) ts = 1.1;
    ts *= this.options.globalTimeScale;
    this.lastRender = now;
    this.updateDrops(ts);
    this.rafId = requestAnimationFrame(this.update);
  };

  stop() { this.stopped = true; cancelAnimationFrame(this.rafId); }
}
