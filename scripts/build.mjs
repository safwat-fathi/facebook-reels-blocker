// One source, two outputs: dist/chrome and dist/firefox differ only in the manifest.
import { build } from "esbuild";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const base = JSON.parse(readFileSync("src/manifest.json", "utf8"));
const targets = process.argv[2] ? [process.argv[2]] : ["chrome", "firefox"];

for (const target of targets) {
	const out = `dist/${target}`;
	rmSync(out, { recursive: true, force: true });
	mkdirSync(out, { recursive: true });

	await build({
		entryPoints: ["src/background.ts", "src/content.ts", "src/popup.ts"],
		outdir: out,
		bundle: true,
		format: "iife", // content scripts can't be ES modules
		target: "es2022",
		sourcemap: true,
		logLevel: "warning",
	});
	cpSync("popup.html", `${out}/popup.html`);
	cpSync("icons", `${out}/icons`, { recursive: true, filter: f => !f.endsWith(".svg") });

	const m = structuredClone(base);
	m.version = pkg.version;
	if (target === "chrome") {
		delete m.browser_specific_settings;
		delete m.background.scripts;
	} else {
		delete m.background.service_worker;
	}
	writeFileSync(`${out}/manifest.json`, JSON.stringify(m, null, "\t") + "\n");
	console.log(`built ${out}`);
}
