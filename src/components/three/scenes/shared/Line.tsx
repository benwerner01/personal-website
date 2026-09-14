import { FC, useEffect, useMemo, useState } from "react";
import { ColorRepresentation, Vector2, Vector3 } from "three";
import { Line2, LineGeometry, LineMaterial } from "three-stdlib";

export type LineProps = {
  points: readonly Vector3[];
  color?: ColorRepresentation;
  lineWidth?: number;
};

// drei 9.14's <Line> gave its LineMaterial a fixed 512×512 `resolution` (the
// shader's notion of the viewport), which three-stdlib's LineSegments2 instead
// sets to the real viewport before every render. With the real viewport a
// `lineWidth` of 1 is exactly 1 px in every direction; with 512×512 the width
// scales with the viewport and, since the shader's aspect correction is then
// wrong, vertical lines come out `viewport aspect` times wider than horizontal
// ones. The scene was tuned on the latter, so keep it: the resolution is pinned
// and the per-render update is disabled.
const LEGACY_LINE_RESOLUTION = new Vector2(512, 512);

/**
 * A polyline drawn with three-stdlib's `Line2` (screen-space line width),
 * the subset of `@react-three/drei`'s `<Line>` the scenes use.
 */
const Line: FC<LineProps> = ({ points, color = 0xffffff, lineWidth = 1 }) => {
  const geometry = useMemo(
    () =>
      new LineGeometry().setPositions(
        points.flatMap((point) => point.toArray()),
      ),
    [points],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);

  const [material] = useState(() => {
    const lineMaterial = new LineMaterial();
    lineMaterial.resolution = LEGACY_LINE_RESOLUTION; // copied into the uniform
    return lineMaterial;
  });
  useEffect(() => () => material.dispose(), [material]);

  const [line] = useState(() => {
    const line2 = new Line2(geometry, material);
    // LineSegments2.onBeforeRender is what copies the viewport into `resolution`.
    line2.onBeforeRender = () => {};
    return line2;
  });

  return (
    <primitive object={line}>
      <primitive object={geometry} attach="geometry" />
      <primitive
        object={material}
        attach="material"
        color={color}
        linewidth={lineWidth}
      />
    </primitive>
  );
};

export default Line;
