import fs from "node:fs";
import { JSDOM } from "jsdom";
import axe from "axe-core"; 
import type { AxeResults } from "axe-core";
import path from "node:path";

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
    window.eval(axe.source);

    // 2. Access the injected axe object via the window and run it
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
