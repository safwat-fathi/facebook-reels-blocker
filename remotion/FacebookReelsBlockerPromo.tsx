import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { ActionScene } from "./scenes/ActionScene";
import { OutroScene } from "./scenes/OutroScene";

export const FacebookReelsBlockerPromo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: The Problem (Frames 0 - 120) */}
      <TransitionSeries.Sequence name="Problem" durationInFrames={120}>
        <ProblemScene />
      </TransitionSeries.Sequence>

      {/* Transition 1: Slide from right (15 frames) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 2: The Solution (125 frames) */}
      <TransitionSeries.Sequence name="Solution" durationInFrames={125}>
        <SolutionScene />
      </TransitionSeries.Sequence>

      {/* Transition 2: Smooth Crossfade (15 frames) */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 3: Live Action Demo (125 frames) */}
      <TransitionSeries.Sequence name="Action" durationInFrames={125}>
        <ActionScene />
      </TransitionSeries.Sequence>

      {/* Transition 3: Slide from right (15 frames) */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 4: Outro & Call to Action (125 frames) */}
      <TransitionSeries.Sequence name="Outro" durationInFrames={125}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
