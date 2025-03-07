import chilProcess from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(chilProcess.exec);

const containerName = "smart-translator-local-db";

async function waitServices(attempts = 1) {
  if (attempts === 20) {
    console.error(`Max attempts reached: ${attempts}`);
    process.exit(1);
  }

  try {
    const { stdout } = await exec(`docker exec ${containerName} pg_isready`);

    if (!stdout.includes("accepting connections")) {
      process.stdout.write(".");
      return waitServices(attempts + 1);
    }
  } catch {
    process.stdout.write(".");
    return waitServices(attempts + 1);
  }

  console.log("\nServices are ready!");
}

waitServices();
