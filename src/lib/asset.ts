import path from "path";

export const ZIP_FILENAME = "geo-score-0.1.0.zip";

/** Absolute path to the server-only extension zip (never under public/). */
export function zipPath(): string {
  return path.join(process.cwd(), "secure", ZIP_FILENAME);
}
