import React from "react";
import { Composition, Folder } from "remotion";
import { FacebookReelsBlockerPromo } from "./FacebookReelsBlockerPromo";
import { FacebookReelsBlockerShorts } from "./FacebookReelsBlockerShorts";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { ActionScene } from "./scenes/ActionScene";
import { OutroScene } from "./scenes/OutroScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 15-Second Master Landscape Promo (1920x1080, 30fps) */}
      <Composition
        id="FacebookReelsBlockerPromo"
        component={FacebookReelsBlockerPromo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 15-Second Vertical Short for Reels/Shorts/TikTok (1080x1920, 30fps) */}
      <Composition
        id="FacebookReelsBlockerShorts"
        component={FacebookReelsBlockerShorts}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Connected Individual Scene Compositions for Studio Editing */}
      <Folder name="Scenes">
        <Composition
          id="Scene1-Problem"
          component={ProblemScene}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene2-Solution"
          component={SolutionScene}
          durationInFrames={125}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene3-Action"
          component={ActionScene}
          durationInFrames={125}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene4-Outro"
          component={OutroScene}
          durationInFrames={125}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
