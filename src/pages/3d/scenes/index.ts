import { FunctionComponent } from "react";
import { CubeCluster } from "./cube-cluster";
import { WarpedSphere } from "./idk";

type Scene = {
  name: string;
  Component: FunctionComponent;
};

export const scenes: Scene[] = [
  {
    name: "Sphere",
    Component: WarpedSphere,
  },
  {
    name: "Random Cube Cluster",
    Component: CubeCluster,
  },
];
