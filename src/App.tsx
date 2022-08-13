import Container from "@suid/material/Container";
import CssBaseline from "@suid/material/CssBaseline";
import TextField from "@suid/material/TextField";
import Stack from "@suid/material/Stack";
import { createSignal } from "solid-js";
import DNASeq from "./common/DNASeq";
import Box from "@suid/material/Box";
import Seq from "./common/Seq";

function App() {
  const [rawSeq, setRawSeq] = createSignal("");
  const seq = () => DNASeq.sanitizeFromRaw(rawSeq());
  const complement = () => seq().complement();
  const reverseComplement = () => seq().reverseComplement();

  return (
    <Box mt={4}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Base"
            variant="outlined"
            value={seq().toString()}
            onChange={(ev) => setRawSeq(ev.target.value)}
          />
          <Stack direction="row" spacing={4} alignItems="center">
            <span>Complement:</span>
            <Seq seq={complement()} />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={4}>
            <span>Reverse Complement:</span>
            <Seq seq={reverseComplement()} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
