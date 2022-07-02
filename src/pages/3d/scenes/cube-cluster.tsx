import { useThree } from "@react-three/fiber";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import Bloom from "./shared/Bloom";
import CameraControls from "./shared/CameraControls";
import Cube, {
  createCubeDefinition,
  CubeDefinition,
  CUBE_WIDTH,
  getCubeNeighbourDirections,
  NeighourDirection,
  possibleNeighbourDirections,
} from "./shared/Cube";

type CubeClusterDefinition = {
  cubes: CubeDefinition[];
};

const initialCubeCluster: CubeClusterDefinition = {
  cubes: [
    createCubeDefinition({ color: "#9c88ff", center: new Vector3(0, 0, 0) }),
  ],
};

type CubeDefinitionWithNeighbours = CubeDefinition & {
  neighbourDirections: NeighourDirection[];
};

const getOuterCubesOfCustomShape = (params: {
  cubeCluster: CubeClusterDefinition;
}): CubeDefinitionWithNeighbours[] => {
  const { cubeCluster } = params;

  return cubeCluster.cubes
    .map<CubeDefinition & { neighbourDirections: NeighourDirection[] }>(
      (cube) => ({
        ...cube,
        neighbourDirections: getCubeNeighbourDirections({
          center: cube.center,
          possibleNeighbours: cubeCluster.cubes,
        }),
      })
    )
    .filter(({ neighbourDirections }) => neighbourDirections.length < 6);
};

export const CubeCluster: FC = () => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2.5, 10);
  }, [camera]);

  const [cubeCluster, setCubeCluster] =
    useState<CubeClusterDefinition>(initialCubeCluster);

  const addCube = useCallback(
    () =>
      setCubeCluster((prevCubeCluster) => {
        const outerCubes = getOuterCubesOfCustomShape({
          cubeCluster: prevCubeCluster,
        });

        const possiblePositions = outerCubes.reduce<Vector3[]>(
          (prevPositions, { center, neighbourDirections }) => [
            ...prevPositions,
            ...possibleNeighbourDirections
              .filter((direction) => !neighbourDirections.includes(direction))
              .map((direction) => {
                const neighbouringPosition = new Vector3(
                  center.x +
                    (direction === "left"
                      ? -CUBE_WIDTH
                      : direction === "right"
                      ? CUBE_WIDTH
                      : 0),
                  center.y +
                    (direction === "top"
                      ? CUBE_WIDTH
                      : direction === "bottom"
                      ? -CUBE_WIDTH
                      : 0),
                  center.z +
                    (direction === "forward"
                      ? CUBE_WIDTH
                      : direction === "backward"
                      ? -CUBE_WIDTH
                      : 0)
                );

                return prevPositions.find((position) =>
                  neighbouringPosition.equals(position)
                )
                  ? []
                  : neighbouringPosition;
              })
              .flat(),
          ],
          []
        );

        return {
          ...prevCubeCluster,
          cubes: [
            ...prevCubeCluster.cubes,
            createCubeDefinition({
              color: "#9c88ff",
              center:
                possiblePositions[
                  Math.floor(Math.random() * possiblePositions.length)
                ],
              possibleNeighbours: prevCubeCluster.cubes,
            }),
          ],
        };
      }),
    []
  );

  useEffect(() => {
    if (cubeCluster.cubes.length < 25) addCube();
  }, [cubeCluster, addCube]);

  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    const onKeyPress = ({ key }: KeyboardEvent) => {
      if (key === " ") {
        addCube();
      }
    };

    const onPointerDown = () => {
      isDragging.current = false;
    };

    const onPointerMove = () => {
      isDragging.current = true;
    };

    const onPointerUp = () => {
      if (!isDragging.current) {
        addCube();
      }
    };

    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("keypress", onKeyPress);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [addCube]);

  return (
    <Bloom>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {cubeCluster.cubes.map((def) => (
        <Cube key={def.center.toArray().join("-")} {...def} />
      ))}
      <CameraControls />
    </Bloom>
  );
};
