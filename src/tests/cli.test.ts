import { exec } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const cliPath = path.join(__dirname, "../index");

describe("CLI tool", () => {
  it("runs and outputs violations", (done) => {
    const uniqueFileName = `test-cli-${Date.now()}.html`;
    const testFile = path.join(__dirname, uniqueFileName);
    const html = `<html><body><img src="foo.png"></body></html>`;
   try {
     fs.writeFileSync(testFile, html);
   } catch (e) {
     console.error("Failed to write temporary test file:", e);
     done(e);
     return; 
   }

     const command = `ts-node ${cliPath} "${testFile}"`;

     exec(command, (err, stdout, stderr) => {
       try {
         if (fs.existsSync(testFile)) {
           fs.unlinkSync(testFile);
         }
       } catch (error) {
         console.error("Cleanup failed:", error);
       }

      if (err) {
        console.log("stderr:", stderr);
        console.log("stdout:", stdout);
        done(err); 
        return;
      }

      expect(stdout).toContain("Accessibility violations");
      done();
    });
  }, 10000); 
});
