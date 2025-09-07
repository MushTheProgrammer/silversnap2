"use client";

import { useState, useEffect, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function SmokeCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [pointer, setPointer] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setPointer({ x: clientX, y: clientY });

    const newParticle: Particle = {
      id: Date.now(),
      x: clientX,
      y: clientY,
      size: Math.random() * 20 + 10,
    };

    setParticles((prev) => [...prev, newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000); // Corresponds to animation duration
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <div 
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-white/80 transition-transform duration-75"
        style={{ transform: `translate(${pointer.x - 4}px, ${pointer.y - 4}px)` }}
      />
      {particles.map((p) => (
        <div
          key={p.id}
          className="smoke-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </>
  );
}
