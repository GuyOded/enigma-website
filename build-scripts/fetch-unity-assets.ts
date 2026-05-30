import { downloadRelease } from "@terascope/fetch-github-release";
import type {
    GithubRelease,
    GithubReleaseAsset,
} from "@terascope/fetch-github-release/dist/src/interfaces";
import { mkdir } from "node:fs/promises";

const USER = "GuyOded";
const REPO = "enigma-simulation";
const OUTPUT_DIR = "public/assets/build";
const LEAVE_ZIPPED = false;
const VERSION = "v2.1.0";

function filterRelease(release: GithubRelease) {
    return release.tag_name == VERSION;
}

function filterAsset(asset: GithubReleaseAsset): boolean {
    return (
        asset.name.match(
            /build\.data|build\.framework\.js|build\.loader\.js|build\.wasm/gm,
        ) !== null
    );
}

async function main() {
    await mkdir("public/assets", { recursive: true });

    await downloadRelease(
        USER,
        REPO,
        OUTPUT_DIR,
        filterRelease,
        filterAsset,
        LEAVE_ZIPPED,
    );
}

await main();
