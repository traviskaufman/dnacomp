import { createMemo, For, JSX } from "solid-js";
import DNASeq from "./DNASeq";
import { path as d3Path } from "d3-path";
import { range } from "d3-array";
import Stack from "@suid/material/Stack";

export interface Props {
  seq: DNASeq;
}

export default function Seq(props: Props) {
  return (
    <Stack direction="row">
      <For each={props.seq.toArray()}>
        {(label) => <Nucleotide label={label} />}
      </For>
    </Stack>
  );
}

const COLORS = {
  A: {
    bg: "red",
    fg: "white",
  },
  T: {
    bg: "blue",
    fg: "white",
  },
  G: {
    bg: "green",
    fg: "white",
  },
  C: {
    bg: "orange",
    fg: "white",
  },
};

interface NucleotideProps {
  label: string;
}

function Nucleotide(props: NucleotideProps) {
  const { bg, fg } = COLORS[props.label];
  return <Hex radius={25} bg={bg} fg={fg} character={props.label} />;
}

interface HexProps {
  radius: number;
  padding?: number; // Default: 0
  bg: string;
  fg: string;
  character: string;
}

function Hex(props: HexProps) {
  const padding = props.padding ?? 0;
  const size = props.radius * 2 + padding * 2;
  const mp = size / 2;
  const path = createMemo(() => pathForHex(props.radius, padding, mp));
  const fontSize = (props.radius - padding) * 0.5;
  return (
    <svg width={size} height={size}>
      <path d={path()} fill={props.bg} stroke={props.fg} />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill={props.fg}
        stroke={props.fg}
        style={{ "font-size": `${fontSize}px` }}
      >
        {props.character}
      </text>
    </svg>
  );
}

// See: https://en.wikipedia.org/wiki/Hexagon#/media/File:Regular_polygon_6_annotated.svg
// [cos(π/6)*r, sin(π/6)*r], [cos(2π/6)*r, sin(2π/6)*r], ...]
const THIRTY_DEG_RAD = Math.PI / 6;
const SIXTY_DEG_RAD = Math.PI / 3;
function pathForHex(radius: number, padding: number, midpoint: number): string {
  const magnitude = radius - padding;
  const p = d3Path();
  const [firstPoint, ...remainingPoints] = range(6).map((coeff) => {
    const rad = coeff * SIXTY_DEG_RAD + THIRTY_DEG_RAD;
    return {
      x: Math.cos(rad) * magnitude + midpoint,
      y: Math.sin(rad) * magnitude + midpoint,
    };
  });
  p.moveTo(firstPoint.x, firstPoint.y);
  for (const { x, y } of remainingPoints) {
    p.lineTo(x, y);
  }
  p.closePath();
  return p.toString();
}
