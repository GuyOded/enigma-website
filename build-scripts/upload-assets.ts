import { readdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { ArgsParser } from "argparse-ts";

const parser = new ArgsParser({}, [
    {
        name: "--dry-run",
        description: "Enable dry run",
        type: "boolean",
        alias: "-d",
        default: false,
    },
]);

const runWrangler = async (args: string[]) => {
    return new Promise<void>((resolve, reject) => {
        const proc = spawn("npx", ["wrangler", ...args], {
            stdio: "inherit",
            shell: true,
        });
        proc.on("close", (code) => {
            if (code === 0) resolve();
            reject(
                new Error(
                    "wrangler exited with error code: " +
                        (code?.toString() ?? "undefind"),
                ),
            );
        });
    });
};

const main = async () => {
    const args = parser.parse(process.argv.slice(2));
    const dryRun = args.get("--dry-run");

    if (!dryRun) await runWrangler(["login"]);

    for (const file of await readdir("public/assets/build", {
        withFileTypes: true,
    })) {
        if (!file.isFile()) {
            continue;
        }

        if (dryRun) {
            console.log(
                [
                    "r2",
                    "object",
                    "put",
                    "--remote",
                    `unity-assets/${file.name}`,
                    "--file",
                    `${file.parentPath}/${file.name}`,
                ].join(" "),
            );
            continue;
        }

        await runWrangler([
            "r2",
            "object",
            "put",
            "--remote",
            `unity-assets/${file.name}`,
            "--file",
            `${file.parentPath}/${file.name}`,
        ]);
    }
};

await main();
