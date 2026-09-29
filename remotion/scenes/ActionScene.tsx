import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { fontFamily } from "../styles/fonts";
import { MockBrowser } from "../components/MockBrowser";
import { MockFeed } from "../components/MockFeed";
import { PopupModal } from "../components/PopupModal";
import { Particles } from "../components/Particles";

export const ActionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Browser entrance
  const browserScale = interpolate(frame, [0, 22], [0.92, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const browserOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Popup drop-down entrance (frames 22 - 38)
  const popupY = interpolate(frame, [22, 38], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const popupOpacity = interpolate(frame, [22, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor progress towards the toggle switch:
  // frame 36 -> starts moving, frame 62 -> hovering over toggle, frame 66 -> clicks down, frame 80 -> done
  const cursorProgress = interpolate(frame, [36, 62, 66, 80], [0, 0.7, 0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Is toggle ON? Happens at frame 66
  const isToggled = frame >= 66;

  // Block progress on the feed:
  // Starts collapsing at frame 68, finishes by frame 98
  const blockProgress = interpolate(frame, [68, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.2, 0, 0, 1),
  });

  // Toast notification showing success
  const toastY = interpolate(frame, [78, 95], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const toastOpacity = interpolate(frame, [78, 88, 120, 125], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title text animation
  const titleY = interpolate(frame, [0, 20], [-20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070B14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "60px 80px",
        fontFamily,
        overflow: "hidden",
      }}
    >
      <Particles count={18} color="rgba(0, 229, 255, 0.3)" />

      {/* Top Section Headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          translate: `0px ${titleY}px`,
          opacity: titleOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: 100,
            padding: "6px 20px",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 14 }}>⚡</span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#34D399",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Live Demo
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          One Click. Zero Reels.
        </h1>
      </div>

      {/* Center Browser Display */}
      <div
        style={{
          width: 1100,
          height: 680,
          scale: browserScale,
          opacity: browserOpacity,
          position: "relative",
          zIndex: 15,
        }}
      >
        <MockBrowser
          extensionActive={isToggled}
          highlightExtension={frame >= 20 && frame <= 70}
        >
          {/* Feed Inside Browser */}
          <div
            style={{
              height: "100%",
              overflowY: "hidden",
              position: "relative",
              backgroundColor: "#18191a",
              paddingTop: 10,
            }}
          >
            <MockFeed blockProgress={blockProgress} />

            {/* Extension Popup Dropdown */}
            {frame >= 22 && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 30,
                  translate: `0px ${popupY}px`,
                  opacity: popupOpacity,
                  zIndex: 50,
                }}
              >
                <PopupModal
                  isToggled={isToggled}
                  showCursor={frame >= 36 && frame <= 90}
                  cursorProgress={cursorProgress}
                />
              </div>
            )}

            {/* Success Toast */}
            {frame >= 78 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 30,
                  left: "50%",
                  translate: `-50% ${toastY}px`,
                  opacity: toastOpacity,
                  backgroundColor: "rgba(6, 95, 70, 0.95)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid #10B981",
                  borderRadius: 50,
                  padding: "12px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
                  zIndex: 60,
                }}
              >
                <span style={{ fontSize: 20 }}>✨</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>
                  Reels blocked automatically!
                </span>
              </div>
            )}
          </div>
        </MockBrowser>
      </div>

      {/* Bottom Subtitle */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "#94A3B8",
          zIndex: 10,
        }}
      >
        Real-time DOM removal powered by high-efficiency MutationObserver.
      </div>
    </AbsoluteFill>
  );
};
