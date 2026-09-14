import { Line, LineProps } from "@react-three/drei";
import { FC } from "react";
import { Vector2, Vector3 } from "three";
import { Line2, LineSegments2 } from "three-stdlib";
import { legacyRenderTargetColor } from "./legacyRenderTargetColor";

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
      if (isBottomNeighbour(center)(possibleNeighbour)) return "bottom";
      if (isTopNeighbour(center)(possibleNeighbour)) return "top";
      if (isLeftNeighbour(center)(possibleNeighbour)) return "left";
      if (isRightNeighbour(center)(possibleNeighbour)) return "right";
      if (isForwardNeighbour(center)(possibleNeighbour)) return "forward";
      if (isBackwardNeighbour(center)(possibleNeighbour)) return "backward";
      return [];
    })
    .flat();
};

export const createCubeDefinition = (params: {
  center: Vector3;
  color: string;
  possibleNeighbours?: CubeDefinition[];
}): CubeDefinition => {
  const { center } = params;
  const color = legacyRenderTargetColor(params.color);
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

// drei 9.14's <Line> gave its LineMaterial a fixed 512×512 `resolution` (the
// shader's notion of the viewport), which the current three-stdlib
// LineSegments2 instead sets to the real viewport before every render. With
// the real viewport a `lineWidth` of 1 is exactly 1 px in every direction;
// with 512×512 the width scales with the viewport and, since the shader's
// aspect correction is then wrong, vertical lines come out `viewport aspect`
// times wider than horizontal ones. The scene was tuned on the latter, so keep
// it: the resolution is pinned and the per-render update is disabled.
const LEGACY_LINE_RESOLUTION = new Vector2(512, 512);

const keepLegacyResolution = (line: Line2 | LineSegments2 | null) => {
  // LineSegments2.onBeforeRender is what copies the viewport into `resolution`.
  // eslint-disable-next-line no-param-reassign
  if (line) line.onBeforeRender = () => {};
};

const Cube: FC<CubeDefinition> = ({ edges }) => (
  <>
    {edges.map(({ start, end, ...remaining }) => (
      <Line
        key={[start.toArray().join("-"), end.toArray().join("-")].join("_")}
        ref={keepLegacyResolution}
        points={[start, end]}
        resolution={LEGACY_LINE_RESOLUTION}
        {...remaining}
      />
    ))}
  </>
);

export default Cube;
