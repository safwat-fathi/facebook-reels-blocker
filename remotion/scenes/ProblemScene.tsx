import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily, theme } from "../styles/fonts";
import { Particles } from "../components/Particles";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance animations
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleTranslateY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardsEntrance = interpolate(frame, [10, 32], [80, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardsOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Rapid scrolling effect representing the doomscroll
  const scrollOffset = interpolate(frame, [0, 120], [0, -180]);

  // Floating time counter (+15m, +45m, +2h)
  const timeLost = interpolate(frame, [25, 95], [0, 120], {
    extrapolateRight: "clamp",
  });
  const minutes = Math.floor(timeLost);

  // Subtle alert pulse
  const alertPulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#080911",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "80px 100px",
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "25%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.22) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <Particles count={20} color="rgba(255, 51, 102, 0.35)" />

      {/* Top Header & Warning Badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: titleOpacity,
          translate: `0px ${titleTranslateY}px`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: 100,
            padding: "8px 22px",
            marginBottom: 20,
            scale: alertPulse,
          }}
        >
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#F87171",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            The Endless Doomscroll Trap
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 76,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.8)",
          }}
        >
          Facebook Reels Are Hijacking Your Feed.
        </h1>

        <p
          style={{
            margin: "16px 0 0 0",
            fontSize: 32,
            fontWeight: 500,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Endless short-form videos designed to steal hours of your day.
        </p>
      </div>

      {/* Center Reel Carousel Chaos */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          translate: `0px ${cardsEntrance}px`,
          opacity: cardsOpacity,
          zIndex: 10,
          position: "relative",
        }}
      >
        {/* Floating Doomscroll Time Pill */}
        <div
          style={{
            position: "absolute",
            top: -45,
            backgroundColor: "#EF4444",
            padding: "10px 24px",
            borderRadius: 50,
            color: "#FFF",
            fontSize: 22,
            fontWeight: 800,
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.7)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 20,
          }}
        >
          <span>⏳ Time Lost:</span>
          <span style={{ fontFamily: "monospace", fontSize: 26 }}>
            +{minutes}m
          </span>
        </div>

        {/* 3 Reel Cards */}
        {[
          {
            title: "Wait till the end! 😱",
            creator: "@viral_frenzy",
            views: "2.8M views",
            color1: "#be123c",
            color2: "#4c0519",
            rotate: "-6deg",
          },
          {
            title: "Part 4 of 12! Like for Part 5 🔥",
            creator: "@loop_trap",
            views: "5.4M views",
            color1: "#7c2d12",
            color2: "#431407",
            rotate: "0deg",
            scale: 1.08,
          },
          {
            title: "Nobody expected THIS 🤯",
            creator: "@algorithm_snack",
            views: "1.9M views",
            color1: "#581c87",
            color2: "#2e1065",
            rotate: "6deg",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            style={{
              width: 250,
              height: 380,
              borderRadius: 20,
              background: `linear-gradient(170deg, ${card.color1} 0%, ${card.color2} 100%)`,
              border: "2px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
              rotate: card.rotate,
              scale: card.scale || 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Pill */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "4px 10px",
                  borderRadius: 6,
                  color: "#FF4B72",
                  border: "1px solid rgba(255,75,114,0.4)",
                }}
              >
                REELS
              </span>
              <span style={{ fontSize: 12, color: "#FFF", opacity: 0.8 }}>
                {card.views}
              </span>
            </div>

            {/* Play Button Icon */}
            <div
              style={{
                alignSelf: "center",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "18px solid #FFF",
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                  marginLeft: 5,
                }}
              />
            </div>

            {/* Bottom Info */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#38BDF8", marginBottom: 4 }}>
                {card.creator}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#FFF", lineHeight: 1.25 }}>
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Subtitle / Hook */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: "#EF4444",
          opacity: interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" }),
          zIndex: 10,
          letterSpacing: "-0.01em",
        }}
      >
        Say goodbye to compulsive scrolling. There’s a better way. 👇
      </div>
    </AbsoluteFill>
  );
};
