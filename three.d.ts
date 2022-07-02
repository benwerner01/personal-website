/* eslint-disable no-unused-vars */
import { ReactThreeFiber } from "@react-three/fiber";
import { Line } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<Line, typeof Line>;
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
      unrealBloomPass: ReactThreeFiber.Object3DNode<
        EffectComposer,
        typeof UnrealBloomPass
      >;
      effectComposer: ReactThreeFiber.Object3DNode<
        EffectComposer,
        typeof EffectComposer
      >;
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
      renderPass: ReactThreeFiber.Object3DNode<RenderPass, typeof RenderPass>;
      line2: ReactThreeFiber.Object3DNode<Line2, typeof Line2>;
      lineMaterial: ReactThreeFiber.Object3DNode<
        LineMaterial,
        typeof LineMaterial
      >;
      lineGeometry: ReactThreeFiber.Object3DNode<
        LineGeometry,
        typeof LineGeometry
      >;
    }
  }
}
