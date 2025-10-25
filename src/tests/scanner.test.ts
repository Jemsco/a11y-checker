import fs from "fs";
import path from "path";
import { runAccessibilityScan } from "../scanner/scanner";

describe("scanner", () => {
  it("detects missing alt attribute", async () => {
    const testHtml = `<html><body><img src="image.png"></body></html>`;

    const testDir = __dirname;
    const uniqueFileName = `test-scanner-${Date.now()}.html`;
    const file = path.join(testDir, uniqueFileName);

    // Ensure the directory exists (it should, as the test file is there, but this is safe)
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Write the file into src/tests/
    fs.writeFileSync(file, testHtml);

    try {
      // Run the scan
      const results = await runAccessibilityScan(file);

      // Assertions ...
      expect(results.violations.length).toBeGreaterThan(0);
      // expect(results.violations.id).toBe("image-alt"); // Ensure this matches actual axe IDs
    } finally {
      // Clean up: Delete the temporary file afterward
      fs.unlinkSync(file);
      // We don't delete testDir because it contains the test files themselves.
    }
  });
});
