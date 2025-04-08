// src/background.ts
// Detect which browser API to use
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

browserAPI.runtime.onInstalled.addListener(() => {
	// Set default settings
	browserAPI.storage.sync.set({ enabled: true });
});

// For Chrome, we can use the scripting API
// For Firefox, we'll rely on the content_scripts declaration in manifest.json
if (typeof chrome !== "undefined" && chrome.scripting) {
	// This code will only run in Chrome where the scripting API is available
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === "complete" && tab.url?.includes("facebook.com")) {
			chrome.scripting
				.executeScript({
					target: { tabId },
					files: ["content.js"],
				})
				.catch(error => console.error("Error injecting script: ", error));
		}
	});
} else if (typeof browser !== "undefined") {
	// For Firefox, we'll use the tabs.executeScript API which is supported in older versions
	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === "complete" && tab.url?.includes("facebook.com")) {
			browser.tabs
				.executeScript(tabId, {
					file: "content.js",
				})
				.catch(error => console.error("Error injecting script: ", error));
		}
	});
}
