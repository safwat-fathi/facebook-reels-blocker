import React from "react";
import { interpolate, Easing } from "remotion";
import { fontFamily } from "../styles/fonts";

type MockFeedProps = {
  blockProgress?: number; // 0 = completely visible reels, 1 = completely wiped & collapsed
};

export const MockFeed: React.FC<MockFeedProps> = ({
  blockProgress = 0,
}) => {
  // Collapse height and scale for Reels container
  const reelsHeight = interpolate(blockProgress, [0, 0.4, 1], [270, 270, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0, 1),
  });

  const reelsOpacity = interpolate(blockProgress, [0, 0.35, 0.7], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reelsScale = interpolate(blockProgress, [0, 0.3, 0.8], [1, 0.95, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stamp badge showing "BLOCKED!" during transition
  const stampOpacity = interpolate(blockProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stampScale = interpolate(blockProgress, [0.1, 0.35], [2.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scanline effect across the reels section
  const scanlineY = interpolate(blockProgress, [0.1, 0.6], [-20, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 680,
        margin: "0 auto",
        padding: "16px 20px",
        fontFamily,
        color: "#E4E6EB",
      }}
    >
      {/* Feed Post 1: Legitimate friend post */}
      <div
        style={{
          backgroundColor: "#242526",
          borderRadius: 12,
          padding: 16,
          marginBottom: 14,
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#FFF",
            }}
          >
            AR
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#E4E6EB" }}>
              Alex Rivera
            </div>
            <div style={{ fontSize: 11, color: "#B0B3B8", display: "flex", alignItems: "center", gap: 4 }}>
              <span>2 hours ago</span>
              <span>•</span>
              <span>🌍 Public</span>
            </div>
          </div>
        </div>

        <p style={{ margin: "0 0 12px 0", fontSize: 13, lineHeight: "20px", color: "#E4E6EB" }}>
          Shipped our new open-source project today! It feels so great to finally get this out in the wild. Feedback is welcome! 🚀✨
        </p>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 8,
            fontSize: 12,
            color: "#B0B3B8",
            gap: 24,
          }}
        >
          <span>👍 42 Likes</span>
          <span>💬 12 Comments</span>
          <span>↗️ Share</span>
        </div>
      </div>

      {/* REELS SECTION (Collapsing when blocked!) */}
      <div
        style={{
          height: reelsHeight,
          opacity: reelsOpacity,
          scale: reelsScale,
          overflow: "hidden",
          position: "relative",
          marginBottom: reelsHeight > 0 ? 14 : 0,
        }}
      >
        <div
          style={{
            backgroundColor: "#242526",
            borderRadius: 12,
            padding: "14px 16px",
            border: "1px solid rgba(255, 60, 60, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Reels gradient icon */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "linear-gradient(45deg, #FF0055, #FF5000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFF">
                  <path d="M4 6H20V18H4z" fill="none" stroke="#FFF" strokeWidth="2" />
                  <path d="M10 9L15 12L10 15V9Z" fill="#FFF" />
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#E4E6EB" }}>
                Reels and short videos
              </span>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "#FF3366",
                fontWeight: 700,
                backgroundColor: "rgba(255, 51, 102, 0.15)",
                padding: "3px 8px",
                borderRadius: 4,
              }}
            >
              DISTRACTION TRAP
            </span>
          </div>

          {/* 3 Vertical Reel Cards */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              {
                title: "Wait till the end!! 😱",
                views: "1.4M",
                gradient: "linear-gradient(180deg, #1e1b4b 0%, #be123c 100%)",
              },
              {
                title: "Satisfying soap cuts 🧼",
                views: "890K",
                gradient: "linear-gradient(180deg, #312e81 0%, #047857 100%)",
              },
              {
                title: "Dopamine hack test 🧠",
                views: "3.2M",
                gradient: "linear-gradient(180deg, #4c1d95 0%, #b45309 100%)",
              },
            ].map((reel, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: 180,
                  borderRadius: 8,
                  background: reel.gradient,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 10,
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Views Pill */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#FFF",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  ▶ {reel.views}
                </div>

                {/* Floating animated play badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    translate: "-50% -50%",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid #FFF",
                      borderTop: "6px solid transparent",
                      borderBottom: "6px solid transparent",
                      marginLeft: 3,
                    }}
                  />
                </div>

                <div style={{ fontSize: 11, fontWeight: 600, color: "#FFF", textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
                  {reel.title}
                </div>
              </div>
            ))}
          </div>

          {/* Laser Scanline wipe */}
          {blockProgress > 0 && blockProgress < 0.8 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: scanlineY,
                height: 3,
                background: "linear-gradient(90deg, transparent, #00E5FF, #1877F2, transparent)",
                boxShadow: "0 0 15px #00E5FF, 0 0 30px #1877F2",
              }}
            />
          )}

          {/* Huge BLOCKED Stamp */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              border: "5px solid #FF3366",
              color: "#FF3366",
              borderRadius: 12,
              padding: "8px 24px",
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "0.15em",
              rotate: "-12deg",
              scale: stampScale,
              opacity: stampOpacity,
              backgroundColor: "rgba(10, 10, 15, 0.85)",
              boxShadow: "0 0 30px rgba(255, 51, 102, 0.6)",
              pointerEvents: "none",
            }}
          >
            🚫 REELS BLOCKED
          </div>
        </div>
      </div>

      {/* Feed Post 2: Another clean post */}
      <div
        style={{
          backgroundColor: "#242526",
          borderRadius: 12,
          padding: 16,
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10B981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#FFF",
            }}
          >
            SF
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#E4E6EB" }}>
              Safwat Fathi
            </div>
            <div style={{ fontSize: 11, color: "#B0B3B8", display: "flex", alignItems: "center", gap: 4 }}>
              <span>4 hours ago</span>
              <span>•</span>
              <span>👥 Friends</span>
            </div>
          </div>
        </div>

        <p style={{ margin: "0 0 12px 0", fontSize: 13, lineHeight: "20px", color: "#E4E6EB" }}>
          Quiet afternoon coding with coffee. So much easier to stay in flow when you’re not fighting algorithmic distractions! ☕💻
        </p>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: 8,
            fontSize: 12,
            color: "#B0B3B8",
            gap: 24,
          }}
        >
          <span>❤️ 89 Likes</span>
          <span>💬 15 Comments</span>
        </div>
      </div>
    </div>
  );
};
