import { Line, LineProps } from "@react-three/drei";
import { FC } from "react";
import { Vector3 } from "three";

export type CubeVertixId = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";

export const cubeEdgeIds = [
  ["0", "1"],
  ["1", "2"],
  ["2", "3"],
  ["3", "0"],
  ["4", "5"],
  ["5", "6"],
  ["6", "7"],
  ["7", "4"],
  ["0", "4"],
  ["1", "5"],
  ["2", "6"],
  ["3", "7"],
] as const;

type CubeVertices = Record<CubeVertixId, Vector3>;

export const CUBE_WIDTH = 1;

export const createCubeVertices = (params: {
  center: Vector3;
}): CubeVertices => {
  const { center } = params;
  const current = center
    .clone()
    .setX(center.x - CUBE_WIDTH / 2)
    .setY(center.y - CUBE_WIDTH / 2)
    .setZ(center.z + CUBE_WIDTH / 2);

  return {
    "0": current.clone(),
    "1": current.setY(current.y + CUBE_WIDTH).clone(),
    "2": current.setX(current.x + CUBE_WIDTH).clone(),
    "3": current.setY(current.y - CUBE_WIDTH).clone(),
    "4": current
      .setX(current.x - CUBE_WIDTH)
      .setZ(current.z - CUBE_WIDTH)
      .clone(),
    "5": current.setY(current.y + CUBE_WIDTH).clone(),
    "6": current.setX(current.x + CUBE_WIDTH).clone(),
    "7": current.setY(current.y - CUBE_WIDTH).clone(),
  };
};

const isLeftNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x - CUBE_WIDTH &&
    neighbour.center.y === y &&
    neighbour.center.z === z;

const isRightNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x + CUBE_WIDTH &&
    neighbour.center.y === y &&
    neighbour.center.z === z;

const isTopNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x &&
    neighbour.center.y === y + CUBE_WIDTH &&
    neighbour.center.z === z;

const isBottomNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x &&
    neighbour.center.y === y - CUBE_WIDTH &&
    neighbour.center.z === z;

const isForwardNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x &&
    neighbour.center.y === y &&
    neighbour.center.z === z + CUBE_WIDTH;

const isBackwardNeighbour =
  ({ x, y, z }: Vector3) =>
  (neighbour: CubeDefinition) =>
    neighbour.center.x === x &&
    neighbour.center.y === y &&
    neighbour.center.z === z - CUBE_WIDTH;

export const possibleNeighbourDirections = [
  "bottom",
  "top",
  "left",
  "right",
  "forward",
  "backward",
] as const;

export type NeighourDirection = (typeof possibleNeighbourDirections)[number];

export const getCubeNeighbourDirections = (params: {
  center: Vector3;
  possibleNeighbours: CubeDefinition[];
}): NeighourDirection[] => {
  const { center, possibleNeighbours } = params;

  return possibleNeighbours
    .map((possibleNeighbour) => {
      if (isBottomNeighbour(center)(possibleNeighbour)) {
        return "bottom";
      }
      if (isTopNeighbour(center)(possibleNeighbour)) {
        return "top";
      }
      if (isLeftNeighbour(center)(possibleNeighbour)) {
        return "left";
      }
      if (isRightNeighbour(center)(possibleNeighbour)) {
        return "right";
      }
      if (isForwardNeighbour(center)(possibleNeighbour)) {
        return "forward";
      }
      if (isBackwardNeighbour(center)(possibleNeighbour)) {
        return "backward";
      }
      return [];
    })
    .flat();
};

export const createCubeDefinition = (params: {
  center: Vector3;
  color: string;
  possibleNeighbours?: CubeDefinition[];
}): CubeDefinition => {
  const { center, color } = params;
  const vertices = createCubeVertices({ center });

  return {
    center,
    edges: cubeEdgeIds.map((cubeEdgeId) => ({
      color,
      start: vertices[cubeEdgeId[0]],
      end: vertices[cubeEdgeId[1]],
    })),
  };
};

type EdgeDefinition = {
  start: Vector3;
  end: Vector3;
} & Omit<LineProps, "ref" | "points">;

export type CubeDefinition = {
  center: Vector3;
  edges: EdgeDefinition[];
};

const Cube: FC<CubeDefinition> = ({ edges }) => (
  <>
    {edges.map(({ start, end, ...remaining }) => (
      <Line
        key={[start.toArray().join("-"), end.toArray().join("-")].join("_")}
        points={[start, end]}
        {...(remaining as any)}
      />
    ))}
  </>
);

export default Cube;
