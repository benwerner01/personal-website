"use client";

import { Canvas, extend } from "@react-three/fiber";
import { NextPage } from "next";
import { Line } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { NAV_BAR_HEIGHT } from "../nav-bar";
import { scenes } from "./scenes";

extend({
  Line_: Line,
  OrbitControls,
  UnrealBloomPass,
  EffectComposer,
  RenderPass,
  Line2,
  LineMaterial,
  LineGeometry,
});

const ThreeDPage: NextPage = () => (
  <>
    {scenes.map(({ name, Component }) => (
      <Canvas
        key={name}
        gl={{ antialias: true }}
        dpr={
          typeof window !== "undefined" ? window.devicePixelRatio : undefined
        }
        style={{
          height: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
          display: "block",
        }}
      >
        <Component />
      </Canvas>
    ))}
  </>
);

export default ThreeDPage;
