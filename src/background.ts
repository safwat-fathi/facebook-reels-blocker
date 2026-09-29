import { api, getSettings } from "./shared";

const REEL_PATH = /^\/(reels?|share\/r)(\/|$)/;

// Full loads and SPA navigations both surface here with `url` (host permission is enough).
api.tabs.onUpdated.addListener(async (tabId, { url }) => {
	if (!url) return;
	const u = new URL(url);
	const onFacebook = u.hostname === "facebook.com" || u.hostname.endsWith(".facebook.com");
	if (!onFacebook || !REEL_PATH.test(u.pathname)) return;

	const s = await getSettings();
	if (s.enabled && s.redirect) api.tabs.update(tabId, { url: new URL("/", u).href });
});

// Per-tab blocked-count badge. `action` may be missing/limited on some platforms (e.g. Firefox Android).
api.runtime.onMessage.addListener((msg, sender) => {
	const tabId = sender.tab?.id;
	if (typeof msg?.count !== "number" || tabId === undefined) return;
	try {
		Promise.resolve(
			api.action?.setBadgeText?.({ tabId, text: msg.count ? String(msg.count) : "" }),
		).catch(() => {});
	} catch {}
});
