import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

type ParticlesProps = {
  count?: number;
  color?: string;
};

export const Particles: React.FC<ParticlesProps> = ({
  count = 24,
  color = "rgba(0, 229, 255, 0.4)",
}) => {
  const frame = useCurrentFrame();

  const particleData = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Deterministic pseudo-randomness based on index
      const seed1 = Math.sin(i * 997.3) * 10000;
      const x = Math.abs(seed1 - Math.floor(seed1)) * 100;

      const seed2 = Math.cos(i * 443.1) * 10000;
      const y = Math.abs(seed2 - Math.floor(seed2)) * 100;

      const size = 3 + (i % 5) * 2;
      const speed = 0.3 + (i % 4) * 0.2;
      const opacityBase = 0.2 + (i % 3) * 0.25;

      return { x, y, size, speed, opacityBase };
    });
  }, [count]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particleData.map((p, idx) => {
        const offsetY = (frame * p.speed * 1.5) % 110;
        const currentY = (p.y - offsetY + 110) % 110;
        const driftX = Math.sin((frame + idx * 20) * 0.05) * 15;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${currentY}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
              opacity: p.opacityBase,
              translate: `${driftX}px 0px`,
            }}
          />
        );
      })}
    </div>
  );
};
