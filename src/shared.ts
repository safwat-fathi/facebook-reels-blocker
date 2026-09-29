// Firefox: `browser` is promise-based, `chrome` is callback-only. Chrome (MV3) promisifies `chrome`.
export const api: typeof chrome = (globalThis as any).browser ?? chrome;

export const DEFAULTS = {
	enabled: true,
	reels: true,
	redirect: true,
	stories: false,
	suggested: false,
};
export type Settings = typeof DEFAULTS;

// Passing DEFAULTS makes a missing key read as its default, everywhere, in one place.
export const getSettings = () =>
	api.storage.sync.get(DEFAULTS) as Promise<Settings>;
