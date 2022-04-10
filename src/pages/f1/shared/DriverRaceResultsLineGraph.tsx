import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScaleLinear, scaleLinear, ScalePoint, scalePoint } from "d3-scale";
import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";
import { constructorColoursByYear, DATA_POINT_RADIUS } from "./util";
import {
  Race,
  RaceDriverWithResultsAndConstructor,
  SeasonRaces,
} from "./ergastF1Api";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { animated, useSprings, useSpring, useTransition } from "react-spring";

const driverListWidth = 75;

const YAxis: FC<{
  linearScale: ScaleLinear<number, number, never>;
  x: number;
  y1: number;
  y2: number;
}> = ({ linearScale, x, y1, y2 }) => {
  const ticks = linearScale.ticks();

  const [springs, set] = useSprings(ticks.length, (i) => ({
    transform: `translate(0, ${linearScale(0)})`,
  }));

  useEffect(() => {
    set((i) => ({
      transform: `translate(0, ${linearScale(ticks[i])})`,
    }));
  }, [ticks]);

  return (
    <g transform={`translate(${[x, 0].join(",")})`}>
      <path
        d={["M", 0, y1, "V", y2].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {springs.map(({ transform }, i) => {
        return (
          <animated.g key={i} transform={transform}>
            <line x2="-6" stroke="currentColor" />
            <text textAnchor="end" x={-20} y={3} fontSize={10}>
              {ticks[i]}
            </text>
          </animated.g>
        );
      })}
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

const AnimatedPath: FC<{
  coordinates: number[][];
  stroke: string;
}> = ({ coordinates, stroke }) => {
  const { d } = useSpring({
    d: coordinates
      .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
      .join(" "),
  });

  return (
    <animated.path
      d={d}
      fill="none"
      strokeWidth={DATA_POINT_RADIUS * 2}
      opacity={0.25}
      stroke={stroke}
    />
  );
};

const AnimatedCircle: FC<{ x: number; y: number; fill: string }> = ({
  x,
  y,
  fill,
}) => {
  const { cx, cy } = useSpring({
    cx: x,
    cy: y,
  });

  return <animated.circle cx={cx} cy={cy} r={DATA_POINT_RADIUS} fill={fill} />;
};

const driverCardHeight = 24;

const DriverList: FC<{
  drivers: RaceDriverWithResultsAndConstructor[];
  displayingDrivers: string[];
  setDisplayingDrivers: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ drivers, displayingDrivers, setDisplayingDrivers }) => {
  const sortedDrivers = useMemo(
    () =>
      [...drivers].sort((a, b) => {
        const isDisplayingA = displayingDrivers.includes(a.driverId);
        const isDisplayingB = displayingDrivers.includes(b.driverId);
        if (isDisplayingA === isDisplayingB) {
          return b.totalPoints - a.totalPoints;
        }
        return isDisplayingA ? -1 : 1;
      }),
    [drivers, displayingDrivers]
  );

  let height = 0;

  const transitions = useTransition(
    sortedDrivers.map((data) => ({
      ...data,
      y: (height += driverCardHeight) - driverCardHeight,
    })),
    {
      key: (item: RaceDriverWithResultsAndConstructor) => item.driverId,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, height: driverCardHeight, opacity: 1 }),
      update: ({ y }) => ({ y, height: driverCardHeight }),
    }
  );

  return (
    <Box sx={{ width: driverListWidth }}>
      <Typography variant="h5">Drivers</Typography>
      <Box
        position="relative"
        sx={{ height: drivers.length * driverCardHeight }}
      >
        {transitions((style, item, _, index) => (
          <animated.div
            key={item.driverId}
            style={{
              width: "100%",
              position: "absolute",
              zIndex: drivers.length - index,
              ...style,
            }}
          >
            <FormControlLabel
              sx={{
                marginLeft: 0,
                width: "100%",
                justifyContent: "space-between",
              }}
              control={
                <Checkbox
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  checked={displayingDrivers.includes(item.driverId)}
                  onClick={() =>
                    setDisplayingDrivers((prev) =>
                      prev.includes(item.driverId)
                        ? prev.length === 1
                          ? prev
                          : prev.filter((id) => item.driverId !== id)
                        : [...prev, item.driverId]
                    )
                  }
                  sx={{
                    padding: 0,
                  }}
                />
              }
              labelPlacement="start"
              label={item.code}
            />
          </animated.div>
        ))}
      </Box>
      <Fade in={drivers.length !== displayingDrivers.length}>
        <Button
          variant="contained"
          disabled={drivers.length === displayingDrivers.length}
          onClick={() =>
            setDisplayingDrivers(drivers.map(({ driverId }) => driverId))
          }
          sx={{
            marginTop: 1,
            width: "100%",
          }}
        >
          Reset
        </Button>
      </Fade>
    </Box>
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
  console.log(seasonRaceResultsByDriver);
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

  const sortedSeasonRaceResultsByDriver = useMemo(
    () =>
      seasonRaceResultsByDriver.sort((a, b) => b.totalPoints - a.totalPoints),
    [seasonRaceResultsByDriver]
  );

  const [displayingDrivers, setDisplayingDrivers] = useState<string[]>(
    seasonRaceResultsByDriver.map(({ driverId }) => driverId)
  );

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

  const displayingMaxiumPoints = useMemo(
    () =>
      sortedSeasonRaceResultsByDriver.filter(({ driverId }) =>
        displayingDrivers.includes(driverId)
      )[0].totalPoints,
    [sortedSeasonRaceResultsByDriver, displayingDrivers]
  );

  const yAxisLinearScale = useMemo(
    () =>
      scaleLinear()
        .domain([
          0,
          displayingMaxiumPoints > 50
            ? Math.ceil(displayingMaxiumPoints / 100) * 100
            : 50,
        ])
        .range([y1, y2]),
    [y1, y2, displayingMaxiumPoints]
  );

  return (
    <Box display="flex">
      <svg
        ref={svgRef}
        style={{
          width: `calc(100% - ${driverListWidth}px)`,
          height: 750,
        }}
      >
        {seasonRaceResultsByDriver.map(({ driverId, Results, Constructor }) => {
          const isDisplayingDriver = displayingDrivers.includes(driverId);
          let totalPoints = 0;

          const coordinates = Results.map(({ round, points }) => {
            const pointsInRace = parseInt(points, 10);
            totalPoints += pointsInRace;
            return { round, totalPoints };
          }).map(({ round, totalPoints }) => [
            xPointScale(round),
            yAxisLinearScale(isDisplayingDriver ? totalPoints : 0),
          ]);

          const color =
            constructorColoursByYear[year]?.[Constructor.constructorId] ??
            "currentColor";

          return (
            <Box
              component="g"
              key={driverId}
              sx={{
                opacity: isDisplayingDriver ? 1 : 0,
                transition: (theme) => theme.transitions.create("opacity"),
              }}
            >
              <AnimatedPath coordinates={coordinates} stroke={color} />
              {coordinates.map(([x, y], i) => (
                <AnimatedCircle key={i} x={x} y={y} fill={color} />
              ))}
            </Box>
          );
        })}
        <YAxis linearScale={yAxisLinearScale} x={50} y1={y1} y2={y2} />
        <XAxis
          races={allRaces}
          pointSale={xPointScale}
          y={y1}
          x1={x1}
          x2={x2}
        />
      </svg>
      <DriverList
        displayingDrivers={displayingDrivers}
        setDisplayingDrivers={setDisplayingDrivers}
        drivers={sortedSeasonRaceResultsByDriver}
      />
    </Box>
  );
};

export default DriverRaceResultsLineGraph;
