// JSX elements registered with @react-three/fiber's `extend()` in
// src/pages/3d/index.page.tsx. R3F 9 types custom elements by augmenting its
// `ThreeElements` interface (the global `JSX.IntrinsicElements` +
// `ReactThreeFiber.Object3DNode` form used with R3F 7 no longer exists).
import type { ThreeElement } from "@react-three/fiber";
import type { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";

declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>;
    effectComposer: ThreeElement<typeof EffectComposer>;
    renderPass: ThreeElement<typeof RenderPass>;
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>;
  }
}
