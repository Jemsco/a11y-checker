import fs from "fs";
import { JSDOM } from "jsdom";
import axe from "axe-core"; // Keep this import
import type { AxeResults } from "axe-core";
import path from "path";

// The main function signature remains the same
export async function runAccessibilityScan(
  filePath: string
): Promise<AxeResults> {
  const normalizedPath = path.normalize(filePath);
  if (!fs.existsSync(normalizedPath)) {
    throw new Error(`File not found: ${normalizedPath}`);
  }

  const html = fs.readFileSync(normalizedPath, "utf-8");
  // Important: JSDOM must be configured to run scripts for axe to work
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
  });
  const window = dom.window;

  // Use the built-in JSDOM mechanism to run the axe source within the window context
  return new Promise<AxeResults>((resolve, reject) => {
    // 1. Inject axe-core source into the virtual window
    window.eval(axe.source);

    // 2. Access the injected axe object via the window and run it
    // The types here might need a slight cast depending on strictness
    (window as any).axe.run(
      window.document,
      {},
      (err: Error | null, results: AxeResults) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
}
