import fs from "node:fs";
import path from "node:path";
import { runAccessibilityScan } from "../scanner/scanner";

describe("scanner", () => {
  it("detects missing alt attribute", async () => {
    const testHtml = `<html><body><img src="image.png"></body></html>`;

    const testDir = __dirname;
    const uniqueFileName = `test-scanner-${Date.now()}.html`;
    const file = path.join(testDir, uniqueFileName);

    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Write the file into src/tests/
    fs.writeFileSync(file, testHtml);

    try {
      const results = await runAccessibilityScan(file);

      expect(results.violations.length).toBeGreaterThan(0);
    } finally {
      // Clean up: Delete the temporary file afterward
      fs.unlinkSync(file);
    }
  });
});
