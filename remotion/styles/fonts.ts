import { loadFont } from "@remotion/google-fonts/Inter";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const theme = {
  colors: {
    bgDark: "#070b14",
    bgCard: "rgba(15, 23, 42, 0.75)",
    fbBlue: "#1877F2",
    fbBlueGlow: "rgba(24, 119, 242, 0.4)",
    fbBlueLight: "#4293f5",
    accentCyan: "#00E5FF",
    dangerRed: "#FF3366",
    dangerGlow: "rgba(255, 51, 102, 0.4)",
    successGreen: "#10B981",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    borderGlass: "rgba(255, 255, 255, 0.12)",
    borderActive: "rgba(24, 119, 242, 0.5)",
  },
  shadows: {
    glowBlue: "0 0 40px rgba(24, 119, 242, 0.4)",
    glowCyan: "0 0 40px rgba(0, 229, 255, 0.35)",
    glowRed: "0 0 40px rgba(255, 51, 102, 0.35)",
    card: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
  },
};
