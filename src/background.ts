const browserAPI = typeof chrome !== "undefined" ? chrome : browser;

browserAPI.runtime.onInstalled.addListener(async () => {
	try {
		await browserAPI.storage.sync.set({ enabled: true });
		const result = await browserAPI.storage.sync.get("enabled");
	} catch (e) {
		console.error("storage.sync error:", e);
	}
});

// Block Reels URLs natively
browserAPI.tabs.onUpdated.addListener(
	(tabId: number, changeInfo: any, tab: any) => {
		if (changeInfo.url) {
			const url = changeInfo.url;
			if (
				url.includes("facebook.com/reel/") ||
				url.includes("facebook.com/reels/")
			) {
				browserAPI.storage.sync.get("enabled").then((result: any) => {
					if (result.enabled !== false) {
						(browserAPI as any).tabs.update(tabId, {
							url: "https://www.facebook.com/",
						});
					}
				});
			}
		}
	},
);
