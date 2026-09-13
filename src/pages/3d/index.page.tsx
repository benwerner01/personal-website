import { NextPage } from "next";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// The postprocessing passes come from three-stdlib rather than three/addons:
// three rewrote UnrealBloomPass in r18x (wider blur kernels and a 3× stronger
// composite), which changes the look of the scene. three-stdlib carries the
// original algorithm the scene was tuned for.
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import { scenes } from "./scenes";
import { NAV_BAR_HEIGHT } from "../../components/NavBar";
import PageHead from "../../components/PageHead";

// The JSX element types for these are declared in /three.d.ts.
extend({
  OrbitControls,
  UnrealBloomPass,
  EffectComposer,
  RenderPass,
});

const ThreeDPage: NextPage = () => (
  <>
    <PageHead
      title="3D — Ben Werner"
      description="Interactive 3D scenes by Ben Werner, rendered in the browser with three.js."
      path="/3d"
    />
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
