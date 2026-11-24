import * as fs from "node:fs";

// One funny excuse from a robot vacuum for missing a spot, in the
// vacuum's own deadpan voice: its lidar filed the crumb as furniture,
// and a polite little machine does not move furniture.
const text = "I didn't miss that spot: my lidar filed the crumb as furniture, and I don't move furniture.";

// Gate: one line, 1–140 characters, UTF-8, not only whitespace.
// The line is 91 characters; it is written with no trailing newline,
// so the file is 91 bytes — the smaller text wins an exact tie.
// The gate throws loudly instead of writing a bad entry, so a broken
// line can never slip through as a silent invalid submission.
if (text.length !== 91) {
  throw new Error(`Expected the 91-character excuse, got ${text.length}`);
}
if (text.length < 1 || text.length > 140) {
  throw new Error(`Expected 1–140 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("Entry must be a single line");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text, "utf8");
