/* eslint-disable no-param-reassign */
import {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { select, Selection } from 'd3-selection';
import {
  forceCollide,
  forceManyBody, forceSimulation, SimulationNodeDatum,
} from 'd3-force';

const MIN_BLOB_RADIUS = 100;
const MAX_BLOB_RADIUS = 300;
const NUMBER_OF_BLOBS = 5;

const COLOURS = [
  '#dbf6ff',
  '#c7ffdf',
  '#e8dbff',
  '#ffdbee',
];

type D3Pointer = Selection<SVGCircleElement, SimulationNodeDatum, SVGGElement, unknown>;

type PointerDatum = {
  variant: 'pointer';
} & SimulationNodeDatum

type D3Blob = Selection<SVGCircleElement, BlobDatum, SVGGElement, unknown>

type BlobDatum = {
  index: number;
  variant: 'blob';
  fill: string;
  radius: number;
  attractive: boolean;
} & SimulationNodeDatum;

type NodeDatum = PointerDatum | BlobDatum;

const useStyles = makeStyles({
  svg: {
    zIndex: -1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

const BackgroundAnimation: FC = () => {
  const classes = useStyles();
  const blobWrapperRef = useRef<SVGGElement>();

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const [
    d3Pointer,
    setD3Pointer,
  ] = useState<D3Pointer | undefined>();

  const [
    d3Blobs,
    setD3Blobs,
  ] = useState<D3Blob | undefined>();

  const calculateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  const simulation = useMemo(() => forceSimulation()
    .force('collision', forceCollide<NodeDatum>()
      .radius((d) => (d.variant === 'pointer' ? 0 : d.radius + 1)))
    .velocityDecay(0.6), []);

  const onMouseMove = useCallback(({ x, y }: MouseEvent) => {
    d3Pointer.datum((d) => {
      d.x = x;
      d.y = y;
      return d;
    });
    simulation.alpha(0.1);
  }, [d3Pointer]);

  useEffect(() => {
    if (d3Pointer) {
      window.addEventListener('mousemove', onMouseMove);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
      };
    }
    return undefined;
  }, [onMouseMove]);

  useEffect(() => {
    if (d3Blobs) {
      simulation.on('tick', () => {
        d3Blobs
          .datum((d) => {
            const { x, y } = d;
            if (x < 0 || x > width || y < 0 || y > height) {
              d.attractive = true;
            }
            d.x = d.x < 0
              ? 0
              : d.x > width
                ? width : d.x;
            d.y = d.y < 0
              ? 0
              : d.y > height
                ? height : d.y;
            return d;
          })
          .attr('cx', ({ x }) => x)
          .attr('cy', ({ y }) => y);

        simulation.force('charge', forceManyBody<NodeDatum>()
          .strength((d) => (d.variant === 'pointer'
            ? -50
            : (d.attractive ? 1 : -1) * 50)));
      });
    }
  }, [d3Blobs]);

  useEffect(() => {
    if (blobWrapperRef.current && width > 0 && height > 0) {
      const wrapper = select(blobWrapperRef.current);

      const pointerDatum: PointerDatum[] = [
        {
          variant: 'pointer',
        },
      ];

      setD3Pointer(wrapper
        .selectAll('circle.pointer')
        .data(pointerDatum)
        .enter()
        .append('circle')
        .classed('blob', true)
        .attr('r', 0)
        .attr('fill-opacity', 0.5));

      const blobsDatum: BlobDatum[] = (new Array(NUMBER_OF_BLOBS))
        .fill({})
        .map((_, index) => ({
          index,
          variant: 'blob',
          radius: Math.random() * (MAX_BLOB_RADIUS - MIN_BLOB_RADIUS + 1) + MIN_BLOB_RADIUS,
          fill: COLOURS[index % COLOURS.length],
          attractive: false,
          x: Math.random() * width,
          y: Math.random() * height,
        }));

      setD3Blobs(wrapper
        .selectAll('circle.blob')
        .data(blobsDatum)
        .enter()
        .append('circle')
        .classed('blob', true)
        .attr('r', ({ radius }) => radius)
        .attr('fill', ({ fill }) => fill));

      const nodeDatum = [
        ...pointerDatum,
        ...blobsDatum,
      ];

      simulation.nodes(nodeDatum);
    }
  }, [blobWrapperRef.current, width, height]);

  return (
    <svg
      className={classes.svg}
      width={width}
      height={height}
      filter="url(#blur)"
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="75"
            colorInterpolationFilters="sRGB"
            result="blur"
          />
        </filter>
        <filter id="gooFilter">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="25"
            colorInterpolationFilters="sRGB"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="gooey"
          />
        </filter>
      </defs>
      <g
        ref={blobWrapperRef}
        filter="url(#gooFilter)"
      />
    </svg>
  );
};

export default BackgroundAnimation;
