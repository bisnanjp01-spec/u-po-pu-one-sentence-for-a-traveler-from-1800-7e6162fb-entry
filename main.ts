import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Think of a spider's web spun over the whole earth, where a tug on one thread brings the letter you ask for from any town to your hand before the hour is out.";

function fail(message: string): never {
  throw new Error(message);
}

const text = SENTENCE.trim();
if (text.length < 1 || text.length > 200) {
  fail(`entry must be 1 to 200 characters, got ${text.length}`);
}
if (/\S/.test(text) === false) {
  fail("entry must not be only white space");
}
const stops = [...text].filter((ch) => ch === ".").length;
if (stops !== 1 || text.endsWith(".") === false) {
  fail("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
