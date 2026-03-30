class FacebookReelsBlocker {
	private isEnabled: boolean = true;
	private mutationObserver: MutationObserver | null = null;
	private browserAPI: any;
	// Combined desktop + mobile selectors
	private reelsSelectors: string[] = [
		// Desktop selectors
		'div[aria-label*="Reels"]',
		'div[role="button"][aria-label*="Reels"]',
		'a[href*="/reel/"]',
		'a[href*="facebook.com/reel"]',

		// Mobile selectors
		'div[data-mcomponent="MContainer"]',
		'div[data-actual-height="460"]',
		'div[style*="height:460px"]',
		"div[data-tracking-duration-id]",
		"div[data-on-visible-action-id]",
		"h2:has(span.f2)",
		'div[data-sigil*="reel"]',
	];

	constructor() {
		// Use the appropriate browser API
		this.browserAPI = typeof chrome !== "undefined" ? chrome : browser;

		this.initializeExtension();
	}

	private async initializeExtension(): Promise<void> {
		// Get enabled status from storage
		this.startBlocking();

		// Listen for changes in settings
		this.browserAPI.storage.onChanged.addListener((changes: any) => {
			if (changes.enabled) {
				this.isEnabled = changes.enabled.newValue;
				if (this.isEnabled) {
					this.startBlocking();
				} else {
					this.stopBlocking();
				}
			}
		});

		// Listen for messages from popup
		this.browserAPI.runtime.onMessage.addListener((message: any) => {
			if (message.action === "start") {
				this.startBlocking();
			} else if (message.action === "stop") {
				this.stopBlocking();
			}
		});
	}

	private blockReels(): void {
		// Fixed: Proper type casting
		this.reelsSelectors.forEach(selector => {
			document.querySelectorAll(selector).forEach(el => {
				if (el instanceof HTMLElement) {
					this.hideElement(el);
				}
			});
		});

		// Special mobile detection
		this.blockMobileReelsByHeader();
		this.blockMobileVideoContainers();
	}

	private blockMobileReelsByHeader(): void {
		const REELS_HEADERS = ["Reels", "ريلز", "릴스", "リール", "短视频"];

		REELS_HEADERS.forEach(headerText => {
			// Use more robust XPath search
			const xpath = `//*[@class='f2' and contains(., '${headerText}')]`;
			const headers = document.evaluate(
				xpath,
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null,
			);

			for (let i = 0; i < headers.snapshotLength; i++) {
				const header = headers.snapshotItem(i);
				if (!(header instanceof HTMLElement)) continue;

				// Traverse up to find container
				// --- FIX: Initialize container with the starting element ---
				let container = header;

				for (let j = 0; j < 5; j++) {
					// Using 'j' to avoid confusion with the outer loop
					// --- FIX: First, get the parent element ---
					const parent = container.parentElement;

					// --- FIX: Check if the parent exists before using it ---
					if (!parent) {
						console.log("No more parent elements found.");
						break;
					}

					console.log(parent); // Now you can safely log the parent

					// Move up the tree for the next iteration
					container = parent;
				}
			}
		});
	}

	private blockMobileVideoContainers(): void {
		// Find all video containers
		const videoContainers = document.querySelectorAll(
			'div[data-actual-height="400"], div[style*="height:400px"]',
		);

		videoContainers.forEach(container => {
			if (!(container instanceof HTMLElement)) return;

			// Find the main reel container (2 levels up)
			let parent = container.parentElement;
			for (let i = 0; i < 3; i++) {
				if (!parent) break;

				// Check for container characteristics
				const height =
					parent.getAttribute("data-actual-height") ||
					parent.style.height ||
					"";

				if (height.includes("460")) {
					this.hideElement(parent);
					break;
				}
				parent = parent.parentElement;
			}
		});
	}

	private hideElement(element: HTMLElement): void {
		if (!element || element.style.display === "none") return;

		// Special handling for mobile containers
		if (element.getAttribute("data-mcomponent") === "MContainer") {
			element.style.display = "none";
			element.setAttribute("data-reels-blocked", "true");
			return;
		}

		// Find the closest meaningful parent
		const container = this.findMobileContainer(element) || element;
		container.style.display = "none";
		container.setAttribute("data-reels-blocked", "true");
	}

	private findMobileContainer(element: HTMLElement): HTMLElement | null {
		const containerSelectors = [
			'div[data-mcomponent="MContainer"]',
			'div[data-actual-height="460"]',
			'div[style*="height:460px"]',
			"div[data-tracking-duration-id]",
		];

		for (let el: HTMLElement | null = element; el; el = el.parentElement) {
			for (const selector of containerSelectors) {
				if (el.matches(selector)) {
					return el;
				}
			}

			if (el.tagName === "BODY") break;
		}
		return null;
	}

	private startBlocking(): void {
		// Initial block of any existing Reels
		this.blockReels();

		// Set up observer to block any new Reels that appear
		this.setupMutationObserver();
	}

	private stopBlocking(): void {
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
			this.mutationObserver = null;
		}
	}

	private blockMobileVideoOverlays(): void {
		// Mobile video player overlay
		const videoOverlays = document.querySelectorAll(
			'div[data-sigil="inline-video-player-overlay"]',
		);

		videoOverlays.forEach(overlay => {
			const container = this.findParentContainer(overlay as HTMLElement);
			if (container && container.querySelector('div[aria-label*="Reel"]')) {
				this.hideElement(container);
			}
		});
	}

	private findParentContainer(element: HTMLElement): HTMLElement | null {
		const mobileContainers = [
			'div[data-sigil="mtop-section"]',
			'div[data-mcomponent="MContainer"]', // Key addition
			'div[data-store*="reel"]',
			'div[role="article"]',
			'div[data-sigil="mComposite"]',
			'div[data-store*="video"]',
		];

		for (let i = 0; i < 6; i++) {
			if (!element) return null;

			for (const selector of mobileContainers) {
				if (element.matches(selector)) {
					return element;
				}
			}

			element = element.parentElement as HTMLElement;
		}

		return null;
	}

	private findPostContainer(element: HTMLElement): HTMLElement | null {
		// Try to find the parent post container
		const containerSelectors = [
			'div[data-pagelet="FeedUnit"]',
			'div[role="article"]',
			'div[data-pagelet^="FeedUnit"]',
		];

		for (
			let currentElement: HTMLElement | null = element;
			currentElement;
			currentElement = currentElement.parentElement
		) {
			for (const selector of containerSelectors) {
				if (currentElement.matches(selector)) {
					return currentElement;
				}
			}

			// Prevent going too far up the DOM
			if (currentElement.tagName === "BODY") break;
		}

		return null;
	}

	private setupMutationObserver(): void {
		this.stopBlocking(); // Make sure we don't have multiple observers

		this.mutationObserver = new MutationObserver(mutations => {
			let shouldBlock = false;

			mutations.forEach(mutation => {
				if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
					shouldBlock = true;
				}
			});

			if (shouldBlock) {
				this.blockReels();
				this.checkUrlAndRedirect();
			}
		});

		this.mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	private checkUrlAndRedirect(): void {
		const url = window.location.href;
		if (
			url.includes("facebook.com/reel/") ||
			url.includes("facebook.com/reels/")
		) {
			// Instead of window.location.replace, which could cause a loop if facebook routing tries to pushstate again
			// and since replacing location might be too aggressive, we just redirect to home feed
			console.log("Blocked Reel URL, redirecting to home.");
			window.location.replace("https://www.facebook.com/");
		}
	}
}
browser.storage.sync.get("enabled").then(r => {
	// Initialize the blocker when the content script loads
	if (r.enabled) {
		console.log("Initializing extension");
		console.log("content script running", location.href);

		new FacebookReelsBlocker();
	}
});
