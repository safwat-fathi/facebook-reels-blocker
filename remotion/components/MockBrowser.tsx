import React from "react";
import { fontFamily, theme } from "../styles/fonts";
import { ExtensionLogo } from "./ExtensionLogo";

type MockBrowserProps = {
  children: React.ReactNode;
  url?: string;
  extensionActive?: boolean;
  highlightExtension?: boolean;
  width?: number | string;
  height?: number | string;
};

export const MockBrowser: React.FC<MockBrowserProps> = ({
  children,
  url = "https://www.facebook.com",
  extensionActive = true,
  highlightExtension = false,
  width = "100%",
  height = "100%",
}) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#18191a",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.8)",
        fontFamily,
      }}
    >
      {/* Top Window Bar */}
      <div
        style={{
          height: 48,
          backgroundColor: "#242526",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 16,
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        {/* Tab pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#18191a",
            padding: "6px 14px",
            borderRadius: "8px 8px 0 0",
            fontSize: 12,
            color: "#E4E6EB",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#1877F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontSize: 11,
              fontWeight: 900,
            }}
          >
            f
          </div>
          <span>Facebook</span>
        </div>

        {/* URL Address Bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#3a3b3c",
            height: 30,
            borderRadius: 8,
            padding: "0 12px",
            fontSize: 12,
            color: "#B0B3B8",
          }}
        >
          {/* Lock Icon */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#31A24C" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ color: "#E4E6EB", fontWeight: 500 }}>facebook.com</span>
        </div>

        {/* Browser Action Icons & Extension Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Extension icon in toolbar */}
          <div
            style={{
              position: "relative",
              padding: 4,
              borderRadius: 6,
              backgroundColor: highlightExtension ? "rgba(24, 119, 242, 0.25)" : "transparent",
              border: highlightExtension ? "1px solid #1877F2" : "1px solid transparent",
              boxShadow: highlightExtension ? "0 0 12px rgba(24, 119, 242, 0.6)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ExtensionLogo size={20} glow={false} />
            {extensionActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 4px #10B981",
                }}
              />
            )}
          </div>

          {/* User profile dot */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#4E4F50",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>

      {/* Browser Body Area */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#18191a",
        }}
      >
        {children}
      </div>
    </div>
  );
};
