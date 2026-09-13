import { useFrame, useThree } from "@react-three/fiber";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Scene, Vector2 } from "three";
import { EffectComposer } from "three-stdlib";

const Bloom: FunctionComponent<
  PropsWithChildren<{
    strength?: number;
    radius?: number;
    threshold?: number;
  }>
> = ({ children, strength = 3, radius = 1, threshold = 0 }) => {
  const { gl, camera, size } = useThree();
  // State rather than a ref: the <renderPass> below needs a re-render to pick
  // the scene up, and R3F 9 can run the first frame before an unrelated
  // re-render gets round to it (RenderPass.render throws on `scene` being
  // undefined).
  const [scene, setScene] = useState<Scene | null>(null);
  const composerRef = useRef<EffectComposer>(undefined);
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

  useEffect(() => {
    if (scene && composerRef.current) {
      composerRef.current.setSize(size.width, size.height);
    }
  }, [scene, composerRef, size]);

  useFrame(() => scene && composerRef.current.render(), 1);

  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer
        ref={(composer) => {
          composerRef.current = composer;
        }}
        args={[gl]}
      >
        <renderPass attach="passes-0" scene={scene} camera={camera} />
        <unrealBloomPass
          attach="passes-1"
          args={[aspect, strength, radius, threshold]}
        />
      </effectComposer>
    </>
  );
};

export default Bloom;
