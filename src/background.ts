const browserAPI = chrome || browser;

browserAPI.runtime.onInstalled.addListener(() => {
	// Set default settings
	chrome.storage.sync.set({ enabled: true });
});

// // Listen for tab updates to inject content script if needed
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
// 	if (changeInfo.status === "complete" && tab.url?.includes("facebook.com")) {
// 		chrome.scripting
// 			.executeScript({
// 				target: { tabId },
// 				files: ["dist/content.js"],
// 			})
// 			.catch(error => console.error("Error injecting script: ", error));
// 	}
// });

// Listen for tab updates to inject content script if needed
// Note: Firefox doesn't support chrome.scripting API in the same way
// so we'll rely on the content_scripts declaration in manifest.json
if (typeof chrome !== 'undefined' && chrome.scripting) {
  browserAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('facebook.com')) {
      chrome.scripting
				.executeScript({
					target: { tabId },
					files: ["content.js"],
				})
				.catch(error => console.error("Error injecting script: ", error));
    }
  });
}
