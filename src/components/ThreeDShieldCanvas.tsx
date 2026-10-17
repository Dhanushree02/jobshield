import React, { useEffect, useRef } from 'react';

interface ThreeDShieldCanvasProps {
  width?: number;
  height?: number;
  threatLevel?: 'safe' | 'warning' | 'danger';
}

export const ThreeDShieldCanvas: React.FC<ThreeDShieldCanvasProps> = ({
  width = 500,
  height = 500,
  threatLevel = 'danger'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set high-DPI resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Color definitions based on threatLevel
    const colors = {
      danger: {
        primary: '#f43f5e',
        glow: 'rgba(244, 63, 94, 0.4)',
        ring: '#f43f5e',
        secondary: '#fb7185',
        particles: 'rgba(251, 113, 133, 0.7)'
      },
      warning: {
        primary: '#f59e0b',
        glow: 'rgba(245, 158, 11, 0.4)',
        ring: '#f59e0b',
        secondary: '#fbbf24',
        particles: 'rgba(251, 191, 36, 0.7)'
      },
      safe: {
        primary: '#10b981',
        glow: 'rgba(16, 185, 129, 0.4)',
        ring: '#10b981',
        secondary: '#34d399',
        particles: 'rgba(52, 211, 153, 0.7)'
      }
    }[threatLevel];

    // 3D Vertices for a faceted 3D Security Shield
    // Front facet, back facet, apex, shoulders, and bottom tip
    const shieldVertices3D = [
      // Outer front contour
      { x: 0, y: -95, z: 20 },    // 0: Top center peak
      { x: -75, y: -75, z: 15 },  // 1: Top left
      { x: -85, y: -10, z: 15 },  // 2: Mid left
      { x: -55, y: 55, z: 10 },   // 3: Lower left
      { x: 0, y: 105, z: 25 },    // 4: Bottom sharp point
      { x: 55, y: 55, z: 10 },    // 5: Lower right
      { x: 85, y: -10, z: 15 },   // 6: Mid right
      { x: 75, y: -75, z: 15 },   // 7: Top right
      
      // Center 3D embossed crest
      { x: 0, y: -50, z: 45 },    // 8: Center high ridge
      { x: -40, y: -10, z: 30 },  // 9: Inner left ridge
      { x: 0, y: 50, z: 40 },     // 10: Center lower ridge
      { x: 40, y: -10, z: 30 },   // 11: Inner right ridge
      
      // Back depth plane (giving it thickness)
      { x: 0, y: -90, z: -25 },   // 12: Back top
      { x: -70, y: -70, z: -20 }, // 13: Back top-left
      { x: -80, y: -10, z: -20 }, // 14: Back mid-left
      { x: 0, y: 95, z: -20 },    // 15: Back bottom
      { x: 80, y: -10, z: -20 },  // 16: Back mid-right
      { x: 70, y: -70, z: -20 },  // 17: Back top-right
    ];

    // Wireframe edges connecting vertices
    const edges = [
      // Outer rim
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
      // Inner crest
      [8, 9], [9, 10], [10, 11], [11, 8],
      // Connecting outer rim to center crest
      [0, 8], [1, 9], [2, 9], [3, 10], [4, 10], [5, 10], [6, 11], [7, 11],
      // Depth connectors to back plane
      [0, 12], [1, 13], [2, 14], [4, 15], [6, 16], [7, 17],
      // Back rim
      [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 12]
    ];

    // Floating 3D ambient particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 360,
      z: (Math.random() - 0.5) * 260,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      speedZ: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2
    }));

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = x * 0.7; // target rotation Y
      mouseRef.current.targetY = -y * 0.5; // target rotation X
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Base rotation with gentle idle wobble + mouse tilt
      const rotY = mouseRef.current.x + Math.sin(time * 0.8) * 0.18;
      const rotX = mouseRef.current.y + Math.cos(time * 0.6) * 0.12;
      const rotZ = Math.sin(time * 0.5) * 0.05;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const fov = 420;
      const centerX = width / 2;
      const centerY = height / 2;

      // 3D rotation projection helper
      const project3D = (pt: { x: number; y: number; z: number }) => {
        // Rotate around Y
        let x1 = pt.x * cosY + pt.z * sinY;
        let y1 = pt.y;
        let z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate around X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate around Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Perspective division
        const distance = fov + z3;
        const scale = fov / Math.max(distance, 50);

        return {
          x: centerX + x3 * scale,
          y: centerY + y3 * scale,
          scale,
          z: z3
        };
      };

      // 1. Draw glowing background aura
      const radialGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180);
      radialGrad.addColorStop(0, colors.glow);
      radialGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
      radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Orbital Cyber Rings
      const ringAngles = [time * 0.7, -time * 0.5, time * 0.9];
      const ringRadii = [135, 150, 165];
      ringAngles.forEach((angle, idx) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle * 0.3 + (idx * Math.PI) / 3);
        ctx.scale(1, 0.38 + idx * 0.05);

        ctx.beginPath();
        ctx.arc(0, 0, ringRadii[idx], 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? colors.ring : 'rgba(16, 185, 129, 0.25)';
        ctx.lineWidth = idx === 0 ? 1.8 : 1;
        ctx.setLineDash(idx === 1 ? [8, 8] : idx === 2 ? [3, 9] : []);
        ctx.stroke();

        // Orbital electron bead
        const orbX = Math.cos(angle * 2) * ringRadii[idx];
        const orbY = Math.sin(angle * 2) * ringRadii[idx];
        ctx.fillStyle = idx === 0 ? colors.primary : '#34d399';
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(orbX, orbY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. Render 3D Ambient Dust Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;
        p.pulse += 0.04;

        // Wrap around bounds
        if (p.x > 180) p.x = -180;
        if (p.x < -180) p.x = 180;
        if (p.y > 180) p.y = -180;
        if (p.y < -180) p.y = 180;
        if (p.z > 130) p.z = -130;
        if (p.z < -130) p.z = 130;

        const proj = project3D(p);
        const alpha = Math.max(0.1, Math.min(0.85, (proj.scale - 0.4) * 0.8));
        const rad = p.size * proj.scale;

        ctx.fillStyle = colors.particles;
        ctx.globalAlpha = alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(0.6, rad), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 4. Project Shield Vertices
      const projectedShield = shieldVertices3D.map(project3D);

      // 5. Draw 3D Shield Faces (translucent cyber panels)
      const facets = [
        [0, 1, 9, 8],
        [8, 9, 10],
        [8, 10, 11],
        [0, 8, 11, 7],
        [1, 2, 9],
        [2, 3, 10, 9],
        [3, 4, 10],
        [4, 5, 10],
        [5, 6, 11, 10],
        [6, 7, 11]
      ];

      facets.forEach((facet, fIdx) => {
        ctx.beginPath();
        facet.forEach((vIdx, i) => {
          const pt = projectedShield[vIdx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();

        // Shimmer gradient across facets
        const p0 = projectedShield[facet[0]];
        const p1 = projectedShield[facet[facet.length - 1]];
        const facetGrad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        const intensity = 0.12 + 0.08 * Math.sin(time * 2 + fIdx);
        facetGrad.addColorStop(0, `rgba(16, 185, 129, ${intensity})`);
        facetGrad.addColorStop(0.5, `rgba(6, 182, 212, ${intensity * 1.2})`);
        facetGrad.addColorStop(1, `rgba(15, 23, 42, ${intensity * 1.5})`);
        ctx.fillStyle = facetGrad;
        ctx.fill();
      });

      // 6. Draw 3D Wireframe Edges
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = colors.primary;
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 8;

      edges.forEach(([i1, i2]) => {
        const p1 = projectedShield[i1];
        const p2 = projectedShield[i2];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // 7. Draw 3D Glowing Vertices
      projectedShield.forEach((pt, idx) => {
        const isCrest = idx >= 8 && idx <= 11;
        ctx.fillStyle = isCrest ? '#ffffff' : colors.secondary;
        ctx.shadowColor = isCrest ? '#ffffff' : colors.primary;
        ctx.shadowBlur = isCrest ? 12 : 6;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isCrest ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 8. 3D Laser Scanning Sweep
      const scanProgress = (Math.sin(time * 2.2) + 1) / 2; // 0 to 1
      const scanY = centerY - 110 + scanProgress * 220;
      
      const scanGrad = ctx.createLinearGradient(centerX - 120, scanY, centerX + 120, scanY);
      scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      scanGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.85)');
      scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.beginPath();
      ctx.moveTo(centerX - 130, scanY);
      ctx.lineTo(centerX + 130, scanY);
      ctx.strokeStyle = scanGrad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Reset shadows
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [width, height, threatLevel]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className="cursor-grab active:cursor-grabbing select-none"
        title="Interactive 3D Holographic Security Core (Move cursor to tilt)"
      />
    </div>
  );
};
