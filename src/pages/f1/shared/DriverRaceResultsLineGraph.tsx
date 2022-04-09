import { FC, useCallback, useMemo, useRef, useState } from "react";
import { ScaleLinear, scaleLinear, ScalePoint, scalePoint } from "d3-scale";
import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";
import { constructorColoursByYear, DATA_POINT_RADIUS } from "./util";
import {
  Race,
  RaceDriverWithResultsAndConstructor,
  SeasonRaces,
} from "./ergastF1Api";

const YAxis: FC<{
  linearScale: ScaleLinear<number, number, never>;
  x: number;
  y1: number;
  y2: number;
}> = ({ linearScale, x, y1, y2 }) => {
  return (
    <g transform={`translate(${[x, 0].join(",")})`}>
      <path
        d={["M", 0, y1, "V", y2].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {linearScale.ticks().map((value) => (
        <g key={value} transform={`translate(0, ${linearScale(value)})`}>
          <line x2="-6" stroke="currentColor" />
          <text textAnchor="end" x={-20} y={3} fontSize={10}>
            {value}
          </text>
        </g>
      ))}
    </g>
  );
};

const XAxis: FC<{
  races: Omit<Race, "Results">[];
  pointSale: ScalePoint<string>;
  y: number;
  x1: number;
  x2: number;
}> = ({ races, pointSale, y, x1, x2 }) => {
  return (
    <g transform={`translate(${[0, y].join(",")})`}>
      <path
        d={["M", x1, 0, "H", x2].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {races.map(({ raceName, round }) => (
        <g key={round} transform={`translate(${pointSale(round)}, 0)`}>
          <line y2="6" stroke="currentColor" />
          <text
            fontSize={10}
            textAnchor="end"
            y={10}
            x={-10}
            transform="rotate(-45)"
          >
            {raceName.replace("Grand Prix", "GP")}
          </text>
        </g>
      ))}
    </g>
  );
};

type DriverRaceResultsLineGraphProps = {
  year;
  seasonRaceResultsByDriver: RaceDriverWithResultsAndConstructor[];
  seasonRaces: SeasonRaces;
};

const DriverRaceResultsLineGraph: FC<DriverRaceResultsLineGraphProps> = ({
  year,
  seasonRaceResultsByDriver,
  seasonRaces,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const [svgSize, setSvgSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const handleSize = useCallback(() => {
    setSvgSize({
      width: svgRef.current?.clientWidth ?? 0,
      height: svgRef.current?.clientHeight ?? 0,
    });
  }, [svgRef.current?.clientWidth, svgRef.current?.clientHeight]);

  useEventListener("resize", handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, [svgRef.current?.clientWidth, svgRef.current?.clientHeight]);

  const { width: svgWidth, height: svgHeight } = svgSize;

  const allRaces = seasonRaces.Races;

  const x1 = 50;
  const x2 = svgWidth - 50;
  const y1 = svgHeight - 100;
  const y2 = 50;

  const xPointScale = useMemo(
    () =>
      scalePoint()
        .domain(allRaces.map(({ round }) => round))
        .range([x1, x2])
        .padding(1),
    [allRaces, x1, x2]
  );

  const yAxisLinearScale = useMemo(
    () => scaleLinear().domain([0, 500]).range([y1, y2]),
    [y1, y2]
  );

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: 750,
      }}
    >
      {seasonRaceResultsByDriver.map(({ driverId, Results, Constructor }) => {
        let totalPoints = 0;

        const coordinates = Results.map(({ round, points }) => {
          const pointsInRace = parseInt(points, 10);
          totalPoints += pointsInRace;
          return { round, totalPoints };
        })
          .filter(({ totalPoints }) => totalPoints !== 0)
          .map(({ round, totalPoints }) => [
            xPointScale(round),
            yAxisLinearScale(totalPoints),
          ]);

        const color =
          constructorColoursByYear[year]?.[Constructor.constructorId];

        return (
          <g key={driverId}>
            <path
              d={coordinates
                .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
                .join(" ")}
              fill="none"
              strokeWidth={DATA_POINT_RADIUS * 2}
              opacity={0.25}
              stroke={color ?? "currentColor"}
            />
            {coordinates.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={DATA_POINT_RADIUS}
                fill={color ?? "currentColor"}
              />
            ))}
          </g>
        );
      })}
      <YAxis linearScale={yAxisLinearScale} x={50} y1={y1} y2={y2} />
      <XAxis races={allRaces} pointSale={xPointScale} y={y1} x1={x1} x2={x2} />
    </svg>
  );
};

export default DriverRaceResultsLineGraph;
