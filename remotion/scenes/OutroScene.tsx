import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily, theme } from "../styles/fonts";
import { ExtensionLogo } from "../components/ExtensionLogo";
import { Particles } from "../components/Particles";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo spring entrance
  const logoScale = interpolate(frame, [0, 25], [0.5, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text entrance
  const textY = interpolate(frame, [10, 32], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA button entrance & pulse
  const ctaScale = interpolate(frame, [25, 45], [0.8, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ctaPulse = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [0.98, 1.02]
  );

  // Badges entrance
  const badgesOpacity = interpolate(frame, [38, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060912",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 100px",
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          translate: "-50% -50%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(24, 119, 242, 0.25) 0%, rgba(0, 229, 255, 0.08) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Particles count={22} color="rgba(0, 229, 255, 0.4)" />

      {/* Top Logo */}
      <div
        style={{
          scale: logoScale,
          opacity: logoOpacity,
          marginBottom: 32,
          zIndex: 10,
        }}
      >
        <ExtensionLogo size={140} glow={true} />
      </div>

      {/* Headline & Subhead */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          translate: `0px ${textY}px`,
          opacity: textOpacity,
          zIndex: 10,
          marginBottom: 44,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 84,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
          }}
        >
          Reclaim Your Facebook Feed.
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            fontSize: 34,
            fontWeight: 500,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          No more reels. No more doomscrolling. Just what you came for.
        </p>
      </div>

      {/* Big Action CTA Button */}
      <div
        style={{
          scale: ctaScale,
          opacity: ctaOpacity,
          zIndex: 20,
          marginBottom: 44,
        }}
      >
        <div
          style={{
            scale: ctaPulse,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            background: "linear-gradient(135deg, #1877F2 0%, #00B4D8 100%)",
            borderRadius: 60,
            padding: "22px 54px",
            color: "#FFFFFF",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            boxShadow: "0 20px 50px rgba(24, 119, 242, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          <span>Available for Chrome & Firefox</span>
          <span style={{ fontSize: 32 }}>➔</span>
        </div>
      </div>

      {/* Feature & Credibility Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          opacity: badgesOpacity,
          zIndex: 10,
          marginBottom: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#E2E8F0",
          }}
        >
          <span style={{ color: "#34D399" }}>✓</span>
          <span>100% Free & Open Source</span>
        </div>

        <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#E2E8F0",
          }}
        >
          <span style={{ color: "#38BDF8" }}>✓</span>
          <span>Zero Telemetry / Private</span>
        </div>

        <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#E2E8F0",
          }}
        >
          <span style={{ color: "#F59E0B" }}>✓</span>
          <span>Lightweight & Fast</span>
        </div>
      </div>

      {/* Project Meta Footer */}
      <div
        style={{
          fontSize: 18,
          color: "#64748B",
          zIndex: 10,
        }}
      >
        <span>Safwat Fathi</span>
        <span style={{ margin: "0 8px" }}>•</span>
        <span>facebook-reels-blocker v0.2.0</span>
        <span style={{ margin: "0 8px" }}>•</span>
        <span>github.com/safwat-fathi/facebook-reels-blocker</span>
      </div>
    </AbsoluteFill>
  );
};
