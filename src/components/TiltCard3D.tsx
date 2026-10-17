import React, { useRef, useState } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  scaleOnHover?: number;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(16, 185, 129, 0.25)',
  maxTilt = 12,
  scaleOnHover = 1.025
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normalizedY = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotateY = normalizedX * maxTilt;
    const rotateX = -normalizedY * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, ${scaleOnHover})`,
      transition: 'transform 0.1s ease-out'
    });

    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative preserve-3d will-change-transform ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle 240px at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 70%)`,
          opacity: spotlight.opacity
        }}
      />
      {children}
    </div>
  );
};
