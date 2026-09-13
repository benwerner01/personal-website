import { useRef, FC } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const CameraControls: FC = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controlsRef = useRef<OrbitControls>(undefined);

  useFrame(() => controlsRef.current.update());

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
