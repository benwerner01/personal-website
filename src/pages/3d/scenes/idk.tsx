import { useThree } from "@react-three/fiber";
import { FC, useEffect } from "react";
import Bloom from "./shared/Bloom";
import CameraControls from "./shared/CameraControls";
import vertexShader from "./vertex-shader.glsl";
import fragmentShader from "./fragment-shader.glsl";

export const WarpedSphere: FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2.5, 10);
  }, [camera]);

  return (
    // <Bloom>
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <icosahedronGeometry args={[2, 4]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <CameraControls />
    </>
    // </Bloom>
  );
};
