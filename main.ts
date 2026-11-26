// Entry program for make.fun's "One-Sentence Absurd Invention Pitch".
//
// The pitch itself is the PITCH constant below: one sentence selling a smart
// alarm clock that negotiates a later start with your boss on your behalf.
// Running this program writes that sentence, exactly as written here, to
// /output/entry.txt so the judge reads the same text this repo advertises.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PITCH =
  "The Snooze Button 2.0: a smart alarm that calls your boss, negotiates a later start, and bills you in dignity. Wakes you up. Keeps you employed. Mostly.";

// The gate takes UTF-8 text of 1 to 220 characters on a single line. Check the
// pitch against that here so a bad edit fails loudly instead of scoring 0.
const chars = [...PITCH].length;
if (chars < 1 || chars > 220 || PITCH.includes("\n")) {
  throw new Error(
    `pitch must be one line of 1-220 characters; it is ${chars} characters`,
  );
}

// The pitch is mirrored in entry.txt beside this file so a human can read it
// without opening code. If the two ever drift apart, stop: the repo would be
// advertising one sentence and entering another.
const here = dirname(fileURLToPath(import.meta.url));
const mirrorPath = join(here, "entry.txt");
if (existsSync(mirrorPath)) {
  const mirror = readFileSync(mirrorPath, "utf8");
  if (mirror !== PITCH) {
    throw new Error("entry.txt no longer matches the pitch embedded in main.ts");
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH, "utf8");
