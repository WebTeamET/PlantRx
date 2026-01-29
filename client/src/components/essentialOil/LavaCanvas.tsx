import React, { useEffect, useRef } from "react";

const LavaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx; 

    class Vec {
      x: number;
      y: number;
      magnitude: number;
      computed = 0;
      force = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.magnitude = x * x + y * y;
      }

      add(v: Vec) {
        return new Vec(this.x + v.x, this.y + v.y);
      }
    }

    class Ball {
      vel: Vec;
      pos: Vec;
      size: number;
      width: number;
      height: number;

      constructor(env: Metaballs) {
        const min = 0.1;
        const max = 0.9;

        this.vel = new Vec(
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + 0.25 * Math.random()),
          (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random())
        );

        this.pos = new Vec(
          0.2 * env.width + Math.random() * env.width * 0.6,
          0.2 * env.height + Math.random() * env.height * 0.6
        );

        this.size =
          env.wh / 15 + (Math.random() * (max - min) + min) * (env.wh / 15);
        this.width = env.width;
        this.height = env.height;
      }

      move() {
        if (this.pos.x >= this.width - this.size) {
          if (this.vel.x > 0) this.vel.x = -this.vel.x;
          this.pos.x = this.width - this.size;
        } else if (this.pos.x <= this.size) {
          if (this.vel.x < 0) this.vel.x = -this.vel.x;
          this.pos.x = this.size;
        }

        if (this.pos.y >= this.height - this.size) {
          if (this.vel.y > 0) this.vel.y = -this.vel.y;
          this.pos.y = this.height - this.size;
        } else if (this.pos.y <= this.size) {
          if (this.vel.y < 0) this.vel.y = -this.vel.y;
          this.pos.y = this.size;
        }

        this.pos = this.pos.add(this.vel);
      }
    }

    class Metaballs {
      step = 5;
      width: number;
      height: number;
      wh: number;
      sx: number;
      sy: number;
      paint = false;
      metaFill: CanvasGradient | string;
      plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
      ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
      mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
      ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
      grid: Vec[] = [];
      balls: Ball[] = [];
      iter = 0;
      sign = 1;

      constructor(
        width: number,
        height: number,
        ballCount: number,
        colorCore: string,
        colorEdge: string
      ) {
        this.width = width;
        this.height = height;
        this.wh = Math.min(width, height);
        this.sx = Math.floor(this.width / this.step);
        this.sy = Math.floor(this.height / this.step);
        this.metaFill = createGradient(width, height, this.wh, colorCore, colorEdge);

        for (let i = 0; i < (this.sx + 2) * (this.sy + 2); i++) {
          this.grid[i] = new Vec(
            (i % (this.sx + 2)) * this.step,
            Math.floor(i / (this.sx + 2)) * this.step
          );
        }

        for (let i = 0; i < ballCount; i++) {
          this.balls[i] = new Ball(this);
        }
      }

      computeForce(x: number, y: number, idx?: number) {
        let force: number;
        const e = idx ?? x + y * (this.sx + 2);

        if (x === 0 || y === 0 || x === this.sx || y === this.sy) {
          force = 0.6 * this.sign;
        } else {
          force = 0;
          const n = this.grid[e];
          let b: Ball | undefined;
          let a = 0;
          while ((b = this.balls[a++])) {
            force +=
              (b.size * b.size) /
              (-2 * n.x * b.pos.x -
                2 * n.y * b.pos.y +
                b.pos.magnitude +
                n.magnitude);
          }
          force *= this.sign;
        }

        this.grid[e].force = force;
        return force;
      }

      marchingSquares(t: [number, number, number | boolean]) {
        const [ix0, iy0, prevCase] = t;
        const e = ix0 + iy0 * (this.sx + 2);

        if (this.grid[e].computed === this.iter) return false;

        let cas = 0;
        for (let a = 0; a < 4; a++) {
          const l =
            ix0 +
            this.ix[a + 12] +
            (iy0 + this.ix[a + 16]) * (this.sx + 2);
          let d = this.grid[l].force;
          if (
            (d > 0 && this.sign < 0) ||
            (d < 0 && this.sign > 0) ||
            !d
          ) {
            d = this.computeForce(
              ix0 + this.ix[a + 12],
              iy0 + this.ix[a + 16],
              l
            );
          }
          if (Math.abs(d) > 1) cas += Math.pow(2, a);
        }

        if (cas === 15) return [ix0, iy0 - 1, false] as [number, number, boolean];

        let r: number;
        if (cas === 5) {
          r = prevCase === 2 ? 3 : 1;
        } else if (cas === 10) {
          r = prevCase === 3 ? 0 : 2;
        } else {
          r = this.mscases[cas];
          this.grid[e].computed = this.iter;
        }

        const p =
          this.step /
          (Math.abs(
            Math.abs(
              this.grid[
                ix0 +
                  this.plx[4 * r + 2] +
                  (iy0 + this.ply[4 * r + 2]) * (this.sx + 2)
              ].force
            ) - 1
          ) /
            Math.abs(
              Math.abs(
                this.grid[
                  ix0 +
                    this.plx[4 * r + 3] +
                    (iy0 + this.ply[4 * r + 3]) * (this.sx + 2)
                ].force
              ) - 1
            ) +
            1);

        context.lineTo(
          this.grid[
            ix0 + this.plx[4 * r] + (iy0 + this.ply[4 * r]) * (this.sx + 2)
          ].x +
            this.ix[r] * p,
          this.grid[
            ix0 + this.plx[4 * r + 1] +
              (iy0 + this.ply[4 * r + 1]) * (this.sx + 2)
          ].y +
            this.ix[r + 4] * p
        );

        this.paint = true;
        return [
          ix0 + this.ix[r + 4],
          iy0 + this.ix[r + 8],
          r,
        ] as [number, number, number];
      }

      render() {
        let b: Ball | undefined;
        let i = 0;
        while ((b = this.balls[i++])) {
          b.move();
        }

        this.iter++;
        this.sign = -this.sign;
        this.paint = false;

        context.fillStyle = this.metaFill as CanvasGradient;
        context.beginPath();

        i = 0;
        while ((b = this.balls[i++])) {
          const start: [number, number, number | boolean] = [
            Math.round(b.pos.x / this.step),
            Math.round(b.pos.y / this.step),
            false,
          ];

          let s: [number, number, number | boolean] | false = start;

          do {
            if (!s) break;
            s = this.marchingSquares(s);
          } while (s);

          if (this.paint) {
            context.fill();
            context.closePath();
            context.beginPath();
            this.paint = false;
          }
        }
      }
    }

    type Bubble = {
      x: number;
      y: number;
      radius: number;
      phase: number;
      speed: number;
    };

    const bubbles: Bubble[] = [];

    let texturePattern: CanvasPattern | null = null;
    let textureImageLoaded = false;

    const createGradient = (
      w: number,
      h: number,
      size: number,
      core: string,
      edge: string
    ) => {
      const g = context.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, size);
      g.addColorStop(0, "rgba(255, 255, 255, 0.98)"); 
      g.addColorStop(0.35, "rgba(244, 247, 255, 0.5)"); 
      g.addColorStop(0.8, core);                        
      g.addColorStop(1, edge);                        
      return g;
    };

    let metaballs: Metaballs | null = null;
    let animationId: number;

    const initBubbles = (width: number, height: number) => {
      bubbles.length = 0;
      const count = 18;
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 6 + Math.random() * 10,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.6,
        });
      }
    };

    const drawBubbles = (time: number) => {
      context.save();
      context.globalCompositeOperation = "source-atop";
      bubbles.forEach((b) => {
        const wobble = Math.sin(time * 0.001 * b.speed + b.phase) * 3;
        const cx = b.x + wobble;
        const cy = b.y + wobble * 0.5;
        const r = b.radius;

        const g = context.createRadialGradient(
          cx - r * 0.35,
          cy - r * 0.35,
          r * 0.1,
          cx,
          cy,
          r
        );

        g.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        g.addColorStop(0.3, "rgba(255, 255, 255, 0.4)");
        g.addColorStop(1, "rgba(255, 255, 255, 0)");

        context.fillStyle = g;
        context.beginPath();
        context.arc(cx, cy, r, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();
    };

    const drawBlobLighting = () => {
      if (!metaballs) return;
      context.save();
      context.globalCompositeOperation = "source-atop";

      metaballs.balls.forEach((ball) => {
        const { x, y } = ball.pos;
        const r = ball.size * 1.1;
        const highlight = context.createRadialGradient(
          x - r * 0.35,
          y - r * 0.35,
          r * 0.1,
          x,
          y,
          r
        );
        highlight.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        highlight.addColorStop(0.4, "rgba(255, 255, 255, 0.25)");
        highlight.addColorStop(1, "rgba(255, 255, 255, 0)");

        context.fillStyle = highlight;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();

        const shadow = context.createRadialGradient(
          x + r * 0.35,
          y + r * 0.35,
          r * 0.2,
          x,
          y,
          r * 1.1
        );
        shadow.addColorStop(0, "rgba(0, 0, 0, 0.25)");
        shadow.addColorStop(0.6, "rgba(0, 0, 0, 0.08)");
        shadow.addColorStop(1, "rgba(0, 0, 0, 0)");

        context.fillStyle = shadow;
        context.beginPath();
        context.arc(x, y, r * 1.1, 0, Math.PI * 2);
        context.fill();
      });

      context.restore();
    };

    const loadTexture = () => {
      const img = new Image();
      img.src = "/oil-background-4.jpg"; 
      img.onload = () => {
        texturePattern = context.createPattern(img, "repeat");
        textureImageLoaded = true;
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      metaballs = new Metaballs(
        canvas.width,
        canvas.height,
        8,
        "rgba(235, 215, 160, 0.2)",   
        "rgba(200, 180, 140, 0.005)"  
      );

      initBubbles(canvas.width, canvas.height);
    };

    const renderLoop = (time: number) => {
      if (!metaballs) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalCompositeOperation = "lighter";
      metaballs.render();

      if (texturePattern && textureImageLoaded) {
        context.save();
        context.globalCompositeOperation = "source-atop";
        context.globalAlpha = 0.95;
        context.fillStyle = texturePattern;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
      }

      context.save();
      context.globalCompositeOperation = "source-atop";

      const highlight = context.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      highlight.addColorStop(0, "rgba(255, 255, 255, 0.32)");
      highlight.addColorStop(0.4, "rgba(255, 255, 255, 0.12)");
      highlight.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      context.fillStyle = highlight;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const shadow = context.createLinearGradient(
        canvas.width,
        canvas.height,
        0,
        0
      );
      shadow.addColorStop(0, "rgba(0, 0, 0, 0.18)");
      shadow.addColorStop(0.5, "rgba(0, 0, 0, 0.02)");
      shadow.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      context.fillStyle = shadow;
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.restore();

      context.globalCompositeOperation = "source-over";
      drawBubbles(time);
      animationId = requestAnimationFrame(renderLoop);
    };

    loadTexture();
    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
};

export default LavaCanvas;


