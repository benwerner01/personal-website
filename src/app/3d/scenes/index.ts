import { FunctionComponent } from "react";

import { CubeCluster } from "./cube-cluster";

type Scene = {
  name: string;
  Component: FunctionComponent;
};

export const scenes: Scene[] = [
  {
    name: "Random Cube Cluster",
    Component: CubeCluster,
  },
];
