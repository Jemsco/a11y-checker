import { exec } from "child_process";
import path from "path";
import fs from "fs";

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
     return; // Exit the function if write fails
   }

     const command = `ts-node ${cliPath} "${testFile}"`;

     exec(command, (err, stdout, stderr) => {
       try {
         if (fs.existsSync(testFile)) {
           // Check if the file still exists
           fs.unlinkSync(testFile);
         }
       } catch (cleanupErr) {
         console.error("Cleanup failed:", cleanupErr);
       }

      if (err) {
        // Log the error details so we can see what really happened in the child process
        console.log("stderr:", stderr);
        console.log("stdout:", stdout);
        // If there's an error, pass it to done() to fail the test gracefully
        done(err); 
        return;
      }

      // If successful:
      expect(stdout).toContain("Accessibility violations");
      done();
    });
  }, 10000); // Set explicit timeout in ms
});
