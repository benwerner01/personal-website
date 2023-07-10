import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraControls: FC = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controlsRef = useRef<OrbitControls | null>(null);

  useFrame(() => controlsRef.current?.update());

  return (
    <orbitControls
      ref={(controls) => {
        controlsRef.current = controls;
      }}
      args={[camera, domElement]}
      enableZoom={false}
      autoRotate
      autoRotateSpeed={1}
    />
  );
};

export default CameraControls;
