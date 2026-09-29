import { api, getSettings, type Settings } from "./shared";
import { css, scan } from "./scan";

let cfg: Settings;
let lastCount = -1;
let timer: number | undefined;
const style = document.createElement("style");

const report = (count: number) => {
	if (count === lastCount) return;
	lastCount = count;
	try {
		api.runtime.sendMessage({ count }).catch(() => {});
	} catch {} // extension context invalidated (extension was reloaded/updated)
};
const run = () => {
	timer = undefined;
	if (cfg.enabled) report(scan(document, cfg));
};
// Facebook mutates constantly; coalesce bursts into one scan.
const schedule = () => (timer ??= window.setTimeout(run, 250));
const observer = new MutationObserver(schedule);

function apply() {
	if (!cfg.enabled) {
		observer.disconnect();
		style.remove();
		report(0);
		return;
	}
	style.textContent = css(cfg);
	if (!style.isConnected) document.documentElement.append(style);
	observer.observe(document.body, { childList: true, subtree: true });
	run();
}

getSettings().then(s => {
	cfg = s;
	apply();
});

api.storage.onChanged.addListener((changes, area) => {
	if (area !== "sync" || !cfg) return;
	for (const [k, v] of Object.entries(changes)) if (k in cfg) (cfg as any)[k] = v.newValue;
	apply();
});
