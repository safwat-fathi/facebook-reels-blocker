import React from "react";
import { AbsoluteFill } from "remotion";
import { FacebookReelsBlockerPromo } from "./FacebookReelsBlockerPromo";

export const FacebookReelsBlockerShorts: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05070e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Centered scaled composition container for 9:16 vertical view */}
      <div
        style={{
          width: 1920,
          height: 1080,
          scale: 1080 / 1920,
          transformOrigin: "center center",
        }}
      >
        <FacebookReelsBlockerPromo />
      </div>
    </AbsoluteFill>
  );
};
