/**
 * WebGL rain refraction renderer.
 * Takes the liquid height map from Raindrops and renders refracted bg/fg through a fullscreen quad.
 * Based on Codrops Rain & Water Effect (Lucas Bebber).
 */

const VERT = `attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`;

const FRAG = `precision mediump float;
uniform sampler2D u_waterMap;
uniform sampler2D u_textureShine;
uniform sampler2D u_textureFg;
uniform sampler2D u_textureBg;
uniform vec2 u_resolution;
uniform vec2 u_parallax;
uniform float u_parallaxFg;
uniform float u_parallaxBg;
uniform float u_textureRatio;
uniform int u_renderShine;
uniform int u_renderShadow;
uniform float u_minRefraction;
uniform float u_refractionDelta;
uniform float u_brightness;
uniform float u_alphaMultiply;
uniform float u_alphaSubtract;

vec4 blend(vec4 bg, vec4 fg) {
  vec3 bgm = bg.rgb * bg.a;
  vec3 fgm = fg.rgb * fg.a;
  float ia = 1.0 - fg.a;
  float a = fg.a + bg.a * ia;
  vec3 rgb;
  if (a != 0.0) { rgb = (fgm + bgm * ia) / a; }
  else { rgb = vec3(0.0); }
  return vec4(rgb, a);
}

vec2 pixel() { return vec2(1.0) / u_resolution; }
vec2 parallax(float v) { return u_parallax * pixel() * v; }
vec2 texCoord() { return vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y) / u_resolution; }

vec2 scaledTexCoord() {
  float ratio = u_resolution.x / u_resolution.y;
  vec2 scale = vec2(1.0);
  vec2 offset = vec2(0.0);
  float rd = ratio - u_textureRatio;
  if (rd >= 0.0) { scale.y = 1.0 + rd; offset.y = rd / 2.0; }
  else { scale.x = 1.0 - rd; offset.x = -rd / 2.0; }
  return (texCoord() + offset) / scale;
}

vec4 fgColor(float x, float y) {
  float p2 = u_parallaxFg * 2.0;
  vec2 sc = vec2((u_resolution.x + p2) / u_resolution.x, (u_resolution.y + p2) / u_resolution.y);
  vec2 st = texCoord() / sc;
  vec2 off = vec2((1.0 - 1.0 / sc.x) / 2.0, (1.0 - 1.0 / sc.y) / 2.0);
  return texture2D(u_waterMap, (st + off) + pixel() * vec2(x, y) + parallax(u_parallaxFg));
}

void main() {
  vec4 cur = fgColor(0.0, 0.0);
  float d = cur.b;
  float x = cur.g;
  float y = cur.r;
  float a = clamp(cur.a * u_alphaMultiply - u_alphaSubtract, 0.0, 1.0);
  
  if (a <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 refraction = (vec2(x, y) - 0.5) * 2.0;
  vec2 rPar = parallax(u_parallaxBg - u_parallaxFg);
  vec2 rPos = scaledTexCoord() + pixel() * refraction * (u_minRefraction + d * u_refractionDelta) + rPar;
  
  // clamp rPos to avoid edge artifacts
  rPos = clamp(rPos, 0.0, 1.0);
  
  vec4 tex = texture2D(u_textureFg, rPos);
  
  if (u_renderShine != 0) {
    float maxS = 490.0, minS = maxS * 0.18;
    vec2 sPos = vec2(0.5) + (1.0 / 512.0) * refraction * -(minS + (maxS - minS) * d);
    vec4 shine = texture2D(u_textureShine, sPos);
    tex = blend(tex, shine);
  }
  
  vec4 fg = vec4(tex.rgb * u_brightness, a);
  
  if (u_renderShadow != 0) {
    float bA = fgColor(0.0, -d * 6.0).a;
    bA = bA * u_alphaMultiply - (u_alphaSubtract + 0.5);
    bA = clamp(bA, 0.0, 1.0) * 0.3; // slightly darker shadow
    fg = blend(vec4(0.0, 0.0, 0.0, bA), fg);
  }
  
  // Premultiply alpha for WebGL
  gl_FragColor = vec4(fg.rgb * fg.a, fg.a);
}`;

export interface RainRendererOptions {
  renderShine?: boolean;
  renderShadow?: boolean;
  minRefraction?: number;
  maxRefraction?: number;
  brightness?: number;
  alphaMultiply?: number;
  alphaSubtract?: number;
  parallaxBg?: number;
  parallaxFg?: number;
}

const RENDERER_DEFAULTS: Required<RainRendererOptions> = {
  renderShine: true,
  renderShadow: true,
  minRefraction: 10,
  maxRefraction: 50,
  brightness: 1,
  alphaMultiply: 7,
  alphaSubtract: 3,
  parallaxBg: 5,
  parallaxFg: 20,
};

export interface RainRendererImages {
  liquid: HTMLCanvasElement;
  textureFg: TexImageSource;
  textureBg: TexImageSource;
  textureShine: TexImageSource;
}

function compile(gl: WebGLRenderingContext, src: string, type: number): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[RainRenderer] shader:', gl.getShaderInfoLog(s));
    gl.deleteShader(s); return null;
  }
  return s;
}

function createTex(gl: WebGLRenderingContext, unit: number, src: TexImageSource): WebGLTexture {
  const t = gl.createTexture()!;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
  return t;
}

function texSize(src: TexImageSource): { w: number; h: number } {
  if (src instanceof HTMLImageElement || src instanceof HTMLCanvasElement || src instanceof ImageBitmap)
    return { w: src.width, h: src.height };
  if (src instanceof HTMLVideoElement)
    return { w: src.videoWidth || src.width, h: src.videoHeight || src.height };
  return { w: 1, h: 1 };
}

export class RainRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private posBuf: WebGLBuffer;
  private posLoc: number;
  private liquidTex: WebGLTexture;
  private staticTex: WebGLTexture[];
  private raf = 0;
  private pX = 0; private pY = 0;
  private images: RainRendererImages;
  private loc: Record<string, WebGLUniformLocation | null> = {};

  constructor(
    private canvas: HTMLCanvasElement,
    images: RainRendererImages,
    opt: RainRendererOptions = {},
  ) {
    this.images = images;
    const o = { ...RENDERER_DEFAULTS, ...opt };
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })!;
    if (!gl) throw new Error('WebGL not available');
    this.gl = gl;

    // Compile & link
    const vs = compile(gl, VERT, gl.VERTEX_SHADER)!;
    const fs = compile(gl, FRAG, gl.FRAGMENT_SHADER)!;
    const p = gl.createProgram()!;
    gl.attachShader(p, vs); gl.attachShader(p, fs);
    gl.linkProgram(p); gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error('Program link failed');
    this.program = p;

    // Fullscreen quad
    this.posLoc = gl.getAttribLocation(p, 'a_position');
    this.posBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.posLoc);
    gl.vertexAttribPointer(this.posLoc, 2, gl.FLOAT, false, 0, 0);

    // Textures
    this.liquidTex = (() => {
      const t = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    })();
    this.staticTex = [
      createTex(gl, 1, images.textureShine),
      createTex(gl, 2, images.textureFg),
      createTex(gl, 3, images.textureBg),
    ];

    // Uniforms
    gl.useProgram(p);
    const u = (n: string) => gl.getUniformLocation(p, n);
    this.loc = {
      resolution: u('u_resolution'), parallax: u('u_parallax'),
      parallaxFg: u('u_parallaxFg'), parallaxBg: u('u_parallaxBg'),
      textureRatio: u('u_textureRatio'), renderShine: u('u_renderShine'),
      renderShadow: u('u_renderShadow'), minRefraction: u('u_minRefraction'),
      refractionDelta: u('u_refractionDelta'), brightness: u('u_brightness'),
      alphaMultiply: u('u_alphaMultiply'), alphaSubtract: u('u_alphaSubtract'),
    };
    gl.uniform1i(u('u_waterMap'), 0);
    gl.uniform1i(u('u_textureShine'), 1);
    gl.uniform1i(u('u_textureFg'), 2);
    gl.uniform1i(u('u_textureBg'), 3);

    const { w: bw, h: bh } = texSize(images.textureBg);
    gl.uniform1f(this.loc.textureRatio, bw / Math.max(bh, 1));
    gl.uniform1i(this.loc.renderShine, o.renderShine ? 1 : 0);
    gl.uniform1i(this.loc.renderShadow, o.renderShadow ? 1 : 0);
    gl.uniform1f(this.loc.minRefraction, o.minRefraction);
    gl.uniform1f(this.loc.refractionDelta, o.maxRefraction - o.minRefraction);
    gl.uniform1f(this.loc.brightness, o.brightness);
    gl.uniform1f(this.loc.alphaMultiply, o.alphaMultiply);
    gl.uniform1f(this.loc.alphaSubtract, o.alphaSubtract);
    gl.uniform1f(this.loc.parallaxBg, o.parallaxBg);
    gl.uniform1f(this.loc.parallaxFg, o.parallaxFg);
  }

  setParallax(x: number, y: number) { this.pX = x; this.pY = y; }

  private drawFrame = () => {
    const gl = this.gl;
    const w = this.canvas.width, h = this.canvas.height;
    gl.viewport(0, 0, w, h);
    gl.useProgram(this.program);
    gl.uniform2f(this.loc.resolution, w, h);
    gl.uniform2f(this.loc.parallax, this.pX, this.pY);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.liquidTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.images.liquid);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuf);
    gl.enableVertexAttribArray(this.posLoc);
    gl.vertexAttribPointer(this.posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  start() {
    const loop = () => { this.drawFrame(); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }

  stop() { cancelAnimationFrame(this.raf); this.raf = 0; }

  dispose() {
    this.stop();
    const gl = this.gl;
    gl.deleteTexture(this.liquidTex);
    for (const t of this.staticTex) gl.deleteTexture(t);
    gl.deleteBuffer(this.posBuf);
    gl.deleteProgram(this.program);
  }

  updateTextures(textureFg: HTMLCanvasElement, textureBg: HTMLCanvasElement) {
    const gl = this.gl;
    // Update Fg
    gl.activeTexture(gl.TEXTURE0 + 2);
    gl.bindTexture(gl.TEXTURE_2D, this.staticTex[1]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureFg);
  }
}
