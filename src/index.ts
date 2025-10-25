#!/usr/bin/env node
import { Command } from "commander";
import { runAccessibilityScan } from "./scanner/scanner";
import type { NodeResult, Result } from "axe-core";
import path from "path";

const program = new Command();

program
  .name("a11y-checker")
  .description("CLI tool to check accessibility issues in HTML files")
  .version("0.1.0");

program
  .argument("<file>", "HTML file to scan")
  .option("-j, --json", "Output results as JSON", false)
  .action(async (file: string, options) => {
    const normalizedFile = path.normalize(file); 
    console.log("DEBUG CLI received file", normalizedFile);
    try {
      const results = await runAccessibilityScan(normalizedFile);

      if (options.json) {
        console.log(JSON.stringify(results, null, 2));
      } else {
        if (results.violations.length === 0) {
          console.log("✅ No accessibility violations found!");
        } else {
          console.log("⚠️ Accessibility violations:");
          results.violations.forEach((v: Result) => {
            console.log(`- ${v.id}: ${v.description}`);
            v.nodes.forEach((n: NodeResult) =>
              console.log(`  Node: ${n.html} | Impact: ${n.impact}`)
            );
          });
        }
      }
    } catch (err: any) {
      console.error("Error:", err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
