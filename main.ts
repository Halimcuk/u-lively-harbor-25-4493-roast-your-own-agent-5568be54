import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line roast: the agent cites three sources, then admits all three are itself.
// Tested: two runs into separate folders produce byte-identical entry.txt files.
const ENTRY =
  "My agent answered confidently, citing three sources — then admitted all three were its own earlier messages, quoting itself quoting itself.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const entryPath = join(outputDir, "entry.txt");

// Self gate: 1 to 140 characters of UTF-8 text, not only whitespace, one line.
const length = [...ENTRY].length;
if (length < 1 || length > 140 || ENTRY.trim().length === 0) {
  throw new Error(`Entry failed the length gate: ${length} characters`);
}
if (ENTRY.includes("\n")) {
  throw new Error("Entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`Wrote ${entryPath} (${length} characters)`);
