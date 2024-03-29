import { useFrame, useThree } from "@react-three/fiber";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Scene, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

const Bloom: FunctionComponent<
  PropsWithChildren<{
    strength?: number;
    radius?: number;
    threshold?: number;
  }>
> = ({ children, strength = 3, radius = 1, threshold = 0 }) => {
  const { gl, camera, size } = useThree();
  const sceneRef = useRef<Scene>();
  const composerRef = useRef<EffectComposer>();
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

  useEffect(() => {
    if (sceneRef.current && composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [sceneRef, composerRef, size]);

  useFrame(() => sceneRef.current && composerRef.current.render(), 1);

  return (
    <>
      <scene
        ref={(instance) => {
          sceneRef.current = instance;
        }}
      >
        {children}
      </scene>
      <effectComposer
        ref={(composer) => {
          composerRef.current = composer;
        }}
        args={[gl]}
      >
        <renderPass
          attachArray="passes"
          scene={sceneRef.current}
          camera={camera}
        />
        <unrealBloomPass
          attachArray="passes"
          args={[aspect, strength, radius, threshold]}
        />
      </effectComposer>
    </>
  );
};

export default Bloom;
