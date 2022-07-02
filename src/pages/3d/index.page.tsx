import { NextPage } from "next";
import { Canvas, extend } from "@react-three/fiber";
import { Line } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { scenes } from "./scenes";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";

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
        dpr={typeof window !== "undefined" && window.devicePixelRatio}
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
