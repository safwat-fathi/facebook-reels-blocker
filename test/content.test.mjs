// Runs the real bundled content script against a fake extension API: live toggling without reload.
import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { JSDOM } from "jsdom";

const { outputFiles } = await build({ entryPoints: ["src/content.ts"], bundle: true, format: "iife", write: false, logLevel: "silent" });
const tick = () => new Promise(r => setTimeout(r, 350));

test("toggle on/off/on and section changes apply live", async () => {
	const dom = new JSDOM(`<body><div role="feed"><div role="article" id="r"><a href="/reel/1">x</a></div>
		<div role="article" id="ok">hi</div></div><div data-pagelet="Stories" id="s"></div></body>`, { runScripts: "outside-only" });
	const { window } = dom;
	const store = { enabled: false }; // starts DISABLED: the old code never created listeners in this case
	const listeners = [], msgs = [];
	window.chrome = {
		storage: { sync: { get: async d => ({ ...d, ...store }) }, onChanged: { addListener: f => listeners.push(f) } },
		runtime: { sendMessage: async m => void msgs.push(m) },
	};
	const change = async changes => {
		for (const [k, v] of Object.entries(changes)) store[k] = v;
		listeners.forEach(f => f(Object.fromEntries(Object.entries(changes).map(([k, v]) => [k, { newValue: v }])), "sync"));
		await tick();
	};
	const hidden = () => window.document.querySelector("style")?.textContent ?? "";

	window.eval(outputFiles[0].text);
	await tick();
	assert.equal(hidden(), "", "disabled at load: nothing hidden");

	await change({ enabled: true });
	assert.match(hidden(), /reels/);
	assert.equal(window.document.getElementById("r").getAttribute("data-reels-blocked"), "reels");
	assert.equal(window.document.getElementById("ok").hasAttribute("data-reels-blocked"), false);
	assert.equal(msgs.at(-1).count, 1);

	await change({ enabled: false });
	assert.equal(hidden(), "", "disabled: stylesheet removed, everything visible again");
	assert.equal(msgs.at(-1).count, 0, "badge cleared when disabled");

	await change({ enabled: true, stories: true });
	assert.match(hidden(), /stories/);
	assert.equal(window.document.getElementById("s").getAttribute("data-reels-blocked"), "stories");
});

test("prefers the promise-based `browser` API over `chrome` (Firefox)", async () => {
	const dom = new JSDOM(`<body><div role="article" id="r"><a href="/reel/1">x</a></div></body>`, { runScripts: "outside-only" });
	const { window } = dom;
	const boom = () => { throw new Error("chrome.* must not be used when browser.* exists"); };
	window.chrome = { storage: { sync: { get: boom }, onChanged: { addListener: boom } }, runtime: { sendMessage: boom } };
	let asked = 0;
	window.browser = {
		storage: { sync: { get: async d => (asked++, { ...d }) }, onChanged: { addListener() {} } },
		runtime: { sendMessage: async () => {} },
	};
	window.eval(outputFiles[0].text);
	await tick();
	assert.equal(asked, 1);
	assert.equal(window.document.getElementById("r").getAttribute("data-reels-blocked"), "reels");
});
