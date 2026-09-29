import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily, theme } from "../styles/fonts";
import { ExtensionLogo } from "../components/ExtensionLogo";
import { Particles } from "../components/Particles";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo entrance with spring bounce
  const logoScale = interpolate(frame, [0, 25], [0.3, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Ripple shockwave ring
  const ringScale = interpolate(frame, [10, 50], [0.8, 2.4], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ringOpacity = interpolate(frame, [10, 20, 50], [0, 0.8, 0], {
    extrapolateRight: "clamp",
  });

  // Typography entrance
  const textTranslateY = interpolate(frame, [12, 35], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Feature pills staggered entrance
  const pill1Y = interpolate(frame, [25, 45], [40, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pill1Opacity = interpolate(frame, [25, 40], [0, 1], { extrapolateRight: "clamp" });

  const pill2Y = interpolate(frame, [32, 52], [40, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pill2Opacity = interpolate(frame, [32, 47], [0, 1], { extrapolateRight: "clamp" });

  const pill3Y = interpolate(frame, [39, 59], [40, 0], { extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const pill3Opacity = interpolate(frame, [39, 54], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#060913",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 100px",
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Radiant radial background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          translate: "-50% -50%",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(24, 119, 242, 0.28) 0%, rgba(0, 229, 255, 0.08) 50%, transparent 75%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Expanding shockwave energy ring */}
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "50%",
          translate: "-50% -50%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "2px solid #00E5FF",
          scale: ringScale,
          opacity: ringOpacity,
          boxShadow: "0 0 40px #00E5FF",
          pointerEvents: "none",
        }}
      />

      <Particles count={25} color="rgba(56, 189, 248, 0.4)" />

      {/* Hero Logo with 3D Float */}
      <div
        style={{
          scale: logoScale,
          opacity: logoOpacity,
          marginBottom: 36,
          zIndex: 10,
        }}
      >
        <ExtensionLogo size={150} glow={true} />
      </div>

      {/* Title & Headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          translate: `0px ${textTranslateY}px`,
          opacity: textOpacity,
          zIndex: 10,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(24, 119, 242, 0.2)",
            border: "1px solid rgba(24, 119, 242, 0.5)",
            borderRadius: 100,
            padding: "8px 24px",
            marginBottom: 20,
            boxShadow: "0 0 20px rgba(24, 119, 242, 0.3)",
          }}
        >
          <span style={{ fontSize: 16 }}>🛡️</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#60A5FA",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            The Clean Feed Solution
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 82,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            textShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
          }}
        >
          Facebook Reels Blocker
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            fontSize: 34,
            fontWeight: 500,
            color: "#94A3B8",
            maxWidth: 1000,
            lineHeight: 1.3,
          }}
        >
          Clean up your news feed. Eliminate reels instantly.
        </p>
      </div>

      {/* 3 Value Proposition Cards */}
      <div
        style={{
          display: "flex",
          gap: 24,
          zIndex: 10,
          width: "100%",
          maxWidth: 1100,
          justifyContent: "center",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: 18,
            padding: "24px 28px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
            translate: `0px ${pill1Y}px`,
            opacity: pill1Opacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: "rgba(24, 119, 242, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            ⚡
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
              Instant Removal
            </div>
            <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 4 }}>
              Active DOM monitoring
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: 18,
            padding: "24px 28px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
            translate: `0px ${pill2Y}px`,
            opacity: pill2Opacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            🔒
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
              Privacy First
            </div>
            <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 4 }}>
              Zero tracking or telemetry
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(12px)",
            borderRadius: 18,
            padding: "24px 28px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.6)",
            translate: `0px ${pill3Y}px`,
            opacity: pill3Opacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            🌐
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
              Cross-Browser
            </div>
            <div style={{ fontSize: 14, color: "#94A3B8", marginTop: 4 }}>
              Chrome & Firefox support
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
