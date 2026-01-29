"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import {
  EffectComposer,
  Noise,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

export default function FluidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-transparent">
      <Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Scroll-based layout */}
          <ScrollControls pages={2} distance={1} damping={0.15}>
            
            {/* HTML Content */}
            <Scroll html style={{ width: "100%" }}>
              {children}
            </Scroll>

            {/* Post Processing Effects */}
            <EffectComposer multisampling={0}>
              {/* Soft grain → organic feel */}
              <Noise opacity={0.08} />

              {/* Subtle glow → premium highlights */}
              <Bloom
                intensity={0.25}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.9}
              />

              {/* Darkened edges → cinematic depth */}
              <Vignette
                eskil={false}
                offset={0.15}
                darkness={0.85}
              />
            </EffectComposer>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
