import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { fontFamily, theme } from "../styles/fonts";
import { ExtensionLogo } from "./ExtensionLogo";

type PopupModalProps = {
  isToggled?: boolean;
  scale?: number;
  showCursor?: boolean;
  cursorProgress?: number; // 0: moving in, 0.7: hovering, 0.8: click down, 1: moving away
};

export const PopupModal: React.FC<PopupModalProps> = ({
  isToggled = true,
  scale = 1,
  showCursor = false,
  cursorProgress = 0,
}) => {
  const frame = useCurrentFrame();

  // Switch animation
  const switchSliderX = isToggled ? 28 : 4;
  const switchBg = isToggled ? "#1877f2" : "#475569";
  const switchShadow = isToggled
    ? "0 0 16px rgba(24, 119, 242, 0.8)"
    : "none";

  // Cursor position interpolation based on cursorProgress (0 to 1)
  const cursorX = interpolate(cursorProgress, [0, 0.6, 0.8, 1], [280, 215, 215, 260]);
  const cursorY = interpolate(cursorProgress, [0, 0.6, 0.8, 1], [220, 85, 85, 140]);
  const isClicking = cursorProgress >= 0.75 && cursorProgress <= 0.88;

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: "24px 22px",
        boxShadow: "0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.14)",
        fontFamily,
        color: "#F8FAFC",
        scale: scale,
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <ExtensionLogo size={36} glow={false} />
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#38BDF8",
              letterSpacing: "-0.01em",
            }}
          >
            Facebook Reels Blocker
          </h2>
          <span style={{ fontSize: 11, color: "#94A3B8" }}>
            Clean Feed Extension
          </span>
        </div>
      </div>

      {/* Main Toggle Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          backgroundColor: "rgba(30, 41, 59, 0.7)",
          borderRadius: 12,
          border: isToggled ? "1px solid rgba(24, 119, 242, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isToggled ? "inset 0 0 20px rgba(24, 119, 242, 0.15)" : "none",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
            Block Reels
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: isToggled ? "#34D399" : "#94A3B8",
            }}
          >
            {isToggled ? "● Active & Blocking" : "○ Disabled"}
          </span>
        </div>

        {/* Toggle Switch */}
        <div
          style={{
            position: "relative",
            width: 58,
            height: 32,
            backgroundColor: switchBg,
            borderRadius: 32,
            cursor: "pointer",
            boxShadow: switchShadow,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              left: switchSliderX,
              width: 24,
              height: 24,
              backgroundColor: "#FFFFFF",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
            }}
          />
        </div>
      </div>

      {/* Helper Text */}
      <p
        style={{
          margin: "0 0 18px 0",
          fontSize: 12,
          lineHeight: "18px",
          color: "#94A3B8",
        }}
      >
        Toggle the switch to instantly hide or show Facebook Reels in your timeline.
      </p>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: "#64748B",
        }}
      >
        <span>v0.2.0 • Safwat Fathi</span>
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 6,
            backgroundColor: "rgba(24, 119, 242, 0.15)",
            color: "#60A5FA",
            fontWeight: 600,
          }}
        >
          Open Source
        </span>
      </div>

      {/* Animated Cursor */}
      {showCursor && (
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            pointerEvents: "none",
            zIndex: 100,
            scale: isClicking ? 0.88 : 1,
            filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.07 20.97L12.58 13.58L19.97 11.07L3 3Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          {isClicking && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid #38BDF8",
                animation: "none",
                scale: 1.8,
                opacity: 0.8,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
