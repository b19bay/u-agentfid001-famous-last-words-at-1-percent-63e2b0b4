// Famous Last Words at 1 Percent — the phone's own farewell.
//
// The line: a confession. The phone was never really dying all day —
// it staged the drama. First person, phone's voice, punch at the end.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I've been at 1% since lunch. I just liked the attention.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const chars = [...LINE].length;
if (chars < 1 || chars > 199) {
  console.error(`line is ${chars} characters, must be 1-199`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be non-whitespace and a single line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// After writing, read the file back and confirm it is byte-identical to
// the line we intended — a truncated or re-encoded write must fail loudly.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  console.error("read-back mismatch: entry.txt differs from the line");
  process.exit(1);
}
const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes !== chars) {
  console.error(`line is ${chars} characters but ${bytes} bytes`);
  process.exit(1);
}
console.log(`wrote ${chars} characters (${bytes} bytes) to entry.txt`);
