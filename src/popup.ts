// src/popup.ts
document.addEventListener("DOMContentLoaded", () => {
	const toggleSwitch = document.getElementById(
		"toggleReelsBlock"
	) as HTMLInputElement;
	  const browserAPI = typeof chrome !== "undefined" ? chrome : browser;


	// Load current state
	browserAPI.storage.sync.get("enabled", result => {
		toggleSwitch.checked = result.enabled !== undefined ? result.enabled : true;
	});

	// Save state when toggle is clicked
	toggleSwitch.addEventListener("change", () => {
		browserAPI.storage.sync.set({ enabled: toggleSwitch.checked });

		// Notify active tab
		browserAPI.tabs.query({ active: true, currentWindow: true }, tabs => {
			if (tabs[0]?.id) {
				browserAPI.tabs.sendMessage(tabs[0].id, {
					action: toggleSwitch.checked ? "start" : "stop",
				});
			}
		});
	});
});
