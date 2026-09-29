import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

type ExtensionLogoProps = {
  size?: number;
  glow?: boolean;
};

export const ExtensionLogo: React.FC<ExtensionLogoProps> = ({
  size = 120,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.85, 1.15]
  );

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ambient blur glow */}
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: -10,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(24, 119, 242, 0.6) 0%, rgba(0, 229, 255, 0.2) 60%, transparent 80%)",
            filter: "blur(18px)",
            opacity: pulse,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main SVG Shield Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5))",
        }}
      >
        <defs>
          <linearGradient id="shieldGrad" x1="10" y1="10" x2="110" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#1877F2" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="shieldBorder" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          <linearGradient id="strikeGrad" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4B72" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield Body */}
        <path
          d="M60 10 L102 24 C102 62 85 96 60 112 C35 96 18 62 18 24 L60 10 Z"
          fill="url(#shieldGrad)"
          stroke="url(#shieldBorder)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Gloss overlay */}
        <path
          d="M60 14 L98 26 C98 58 84 88 60 104 L60 14 Z"
          fill="white"
          fillOpacity="0.08"
        />

        {/* Stylized Filmstrip / Reel Icon */}
        <rect
          x="40"
          y="40"
          width="40"
          height="40"
          rx="9"
          fill="rgba(15, 23, 42, 0.65)"
          stroke="#93C5FD"
          strokeWidth="2.5"
        />

        {/* Reel Spool Holes */}
        <circle cx="48" cy="48" r="2.5" fill="#60A5FA" />
        <circle cx="72" cy="48" r="2.5" fill="#60A5FA" />
        <circle cx="48" cy="72" r="2.5" fill="#60A5FA" />
        <circle cx="72" cy="72" r="2.5" fill="#60A5FA" />

        {/* Play triangle inside reel */}
        <polygon points="56,52 68,60 56,68" fill="#F8FAFC" />

        {/* Block Slash Banner */}
        <line
          x1="32"
          y1="88"
          x2="88"
          y2="32"
          stroke="url(#strikeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#badgeGlow)"
        />
      </svg>
    </div>
  );
};
