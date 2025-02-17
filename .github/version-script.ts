import * as fs from "node:fs";
import { execSync } from "node:child_process";
async function main() {
  try {
    console.log("Getting current git hash...");
    const stdout = execSync(`git rev-parse --short HEAD`).toString();

    for (const path of [
      // just the one package for now
      "./packages/agents/package.json",
    ]) {
      const packageJson = JSON.parse(fs.readFileSync(path, "utf-8"));
      packageJson.version = `0.0.0-${stdout.trim()}`;
      fs.writeFileSync(path, `${JSON.stringify(packageJson, null, 2)}\n`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);
