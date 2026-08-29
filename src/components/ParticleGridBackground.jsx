import React, { useEffect, useRef } from 'react';

const ParticleGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = width < 768 ? 35 : 75;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    // Floating metric text items (e.g. "98.889", "39.963")
    const metrics = [
      { text: '98.889', x: width * 0.15, y: height * 0.35, vx: 0.1, vy: -0.15 },
      { text: '39.963', x: width * 0.82, y: height * 0.28, vx: -0.12, vy: 0.1 },
      { text: '101.002', x: width * 0.88, y: height * 0.72, vx: 0.08, vy: 0.12 },
      { text: '0x4F7A', x: width * 0.08, y: height * 0.8, vx: -0.09, vy: -0.08 },
    ];

    // Main render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Particle circle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p1.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#22d3ee';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 140) * 0.25;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      }

      // Draw subtle floating metric data numbers
      ctx.font = '11px "JetBrains Mono", monospace';
      metrics.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        if (m.x < 50 || m.x > width - 50) m.vx *= -1;
        if (m.y < 50 || m.y > height - 50) m.vy *= -1;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#38bdf8';
        ctx.fillText(m.text, m.x, m.y);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for Glowing Cyan Particle Network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* CSS 3D Perspective Grid Floor */}
      <div className="grid-floor-container">
        <div className="grid-floor" />
      </div>

      {/* Corner Ambient Glowing Star (Bottom Right like screenshots) */}
      <div className="fixed bottom-12 right-12 pointer-events-none z-0 opacity-40 animate-pulse">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-cyan-400 drop-shadow-[0_0_12px_#22d3ee]">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
        </svg>
      </div>
    </>
  );
};

export default ParticleGridBackground;
