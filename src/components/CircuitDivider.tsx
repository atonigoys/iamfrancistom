import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
}

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Pulse {
  segmentIndex: number;
  progress: number;
  speed: number;
  size: number;
}

const CircuitDivider = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let segments: Segment[] = [];
    let pulses: Pulse[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      buildCircuit();
    };

    const buildCircuit = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const midY = h / 2;

      nodes = [];
      segments = [];
      pulses = [];

      // Create nodes spread across the width
      const nodeCount = Math.floor(w / 80) + 2;
      const spacing = w / (nodeCount - 1);

      for (let i = 0; i < nodeCount; i++) {
        const x = i * spacing;
        const yOffset = (Math.random() - 0.5) * (h * 0.5);
        nodes.push({
          x,
          y: midY + yOffset,
          radius: Math.random() * 2 + 1.5,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Sort by x for cleaner connections
      nodes.sort((a, b) => a.x - b.x);

      // Create main horizontal backbone
      for (let i = 0; i < nodes.length - 1; i++) {
        const n1 = nodes[i];
        const n2 = nodes[i + 1];

        // Sometimes go straight, sometimes use L-shaped paths
        if (Math.random() > 0.4) {
          // L-shaped: horizontal then vertical
          const midX = (n1.x + n2.x) / 2 + (Math.random() - 0.5) * 20;
          segments.push({ x1: n1.x, y1: n1.y, x2: midX, y2: n1.y });
          segments.push({ x1: midX, y1: n1.y, x2: midX, y2: n2.y });
          segments.push({ x1: midX, y1: n2.y, x2: n2.x, y2: n2.y });
        } else {
          // Direct horizontal with a vertical step
          segments.push({ x1: n1.x, y1: n1.y, x2: n2.x, y2: n1.y });
          segments.push({ x1: n2.x, y1: n1.y, x2: n2.x, y2: n2.y });
        }
      }

      // Add some short branch stubs for detail
      for (let i = 0; i < nodes.length; i++) {
        if (Math.random() > 0.5) {
          const n = nodes[i];
          const dir = Math.random() > 0.5 ? 1 : -1;
          const len = 10 + Math.random() * 20;
          segments.push({ x1: n.x, y1: n.y, x2: n.x, y2: n.y + dir * len });
          // Add a tiny node at the branch end
          nodes.push({
            x: n.x,
            y: n.y + dir * len,
            radius: 1,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      }

      // Create pulses
      for (let i = 0; i < Math.min(segments.length, 12); i++) {
        pulses.push({
          segmentIndex: Math.floor(Math.random() * segments.length),
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.006,
          size: 2 + Math.random() * 2,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Draw segments
      segments.forEach((seg) => {
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        ctx.strokeStyle = "rgba(0, 255, 0, 0.15)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes with pulsing glow
      nodes.forEach((node) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + node.pulsePhase);
        const glowRadius = node.radius * (3 + pulse * 2);

        // Glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(0, 255, 0, ${0.3 + pulse * 0.3})`);
        gradient.addColorStop(1, "rgba(0, 255, 0, 0)");
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 0, ${0.6 + pulse * 0.4})`;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw pulses traveling along segments
      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.segmentIndex = Math.floor(Math.random() * segments.length);
        }

        const seg = segments[p.segmentIndex];
        const x = seg.x1 + (seg.x2 - seg.x1) * p.progress;
        const y = seg.y1 + (seg.y2 - seg.y1) * p.progress;

        // Bright pulse glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 5);
        grad.addColorStop(0, "rgba(0, 255, 0, 0.8)");
        grad.addColorStop(0.3, "rgba(0, 255, 0, 0.3)");
        grad.addColorStop(1, "rgba(0, 255, 0, 0)");
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(x, y, p.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.fillStyle = "rgba(200, 255, 200, 0.95)";
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        const trailLen = 0.08;
        const trailStart = Math.max(0, p.progress - trailLen);
        const tx1 = seg.x1 + (seg.x2 - seg.x1) * trailStart;
        const ty1 = seg.y1 + (seg.y2 - seg.y1) * trailStart;
        const trailGrad = ctx.createLinearGradient(tx1, ty1, x, y);
        trailGrad.addColorStop(0, "rgba(0, 255, 0, 0)");
        trailGrad.addColorStop(1, "rgba(0, 255, 0, 0.5)");
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(x, y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-16 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default CircuitDivider;
