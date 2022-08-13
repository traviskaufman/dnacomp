import { For } from "solid-js";

export default function Seq(props) {
  return <For each={props.seq.toArray()}>{(label) => <Nucleotide label={label} />}</For>
}

const COLORS = {
  'A': {
    bg: 'red',
    fg: 'white',
  },
  'T': {
    bg: 'blue',
    fg: 'white'
  },
  'G': {
    bg: 'green',
    fg: 'white',
  },
  'C': {
    bg: 'orange',
    fg: 'white'
  }
}

function Nucleotide(props) {
  const {bg, fg} = COLORS[props.label];
  return <span style={{'background-color': bg, color: fg}}>{props.label}</span>
}
