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
		'div[data-sigil*="reel"]',
		'div[data-store*="reel"]',
		'div[aria-label*="Reel"]',
		'div[aria-label*="reel"]',
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
			// Targeted XPath for common header tags or elements with specific attributes
			const xpath = `//h2[contains(., '${headerText}')] | //h3[contains(., '${headerText}')] | //span[text()='${headerText}'] | //div[text()='${headerText}' and @data-mcomponent="TextArea"]`;
			const headers = document.evaluate(
				xpath,
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null,
			);

			for (let i = 0; i < headers.snapshotLength; i++) {
				const header = headers.snapshotItem(i);
				if (header instanceof HTMLElement) {
					this.hideElement(header);
				}
			}
		});
	}

	private blockMobileVideoContainers(): void {
		// Find all video containers that explicitly mention reels
		const videoContainers = document.querySelectorAll(
			'div[aria-label*="reel"], div[aria-label*="Reel"], div[data-sigil*="reel"]',
		);

		videoContainers.forEach(container => {
			if (container instanceof HTMLElement) {
				this.hideElement(container);
			}
		});
	}

	private hideElement(element: HTMLElement): void {
		if (!element || element.style.display === "none") return;

		// Find the closest meaningful parent
		const container =
			this.findMobileContainer(element) ||
			this.findPostContainer(element) ||
			element;

		container.style.display = "none";
		container.setAttribute("data-reels-blocked", "true");
	}

	private findMobileContainer(element: HTMLElement): HTMLElement | null {
		const containerSelectors = [
			'div[data-mcomponent="MContainer"]',
			'div[data-actual-height="460"]',
			'div[data-actual-height="464"]',
			'div[style*="height:460px"]',
			'div[style*="height:464px"]',
			'div[data-sigil="mtop-section"]',
			'div[data-sigil="mComposite"]',
			"div[data-tracking-duration-id]",
		];

		let bestCandidate: HTMLElement | null = null;
		let currentEl: HTMLElement | null = element;

		// Limit search to 6 levels to avoid hiding the main page wrapper
		for (let i = 0; i < 6; i++) {
			if (!currentEl || currentEl.tagName === "BODY") break;

			for (const selector of containerSelectors) {
				if (currentEl.matches(selector)) {
					const heightAttr = currentEl.getAttribute("data-actual-height");
					const height = heightAttr ? parseInt(heightAttr) : 0;
					const sigil = currentEl.getAttribute("data-sigil") || "";

					// Specifically target the tray heights or section sigils
					if (
						height === 460 ||
						height === 464 ||
						(height > 300 &&
							(sigil.includes("mtop") || sigil.includes("mComposite")))
					) {
						return currentEl;
					}

					// Fallback to the first MContainer we find
					if (!bestCandidate && currentEl.getAttribute("data-mcomponent") === "MContainer") {
						bestCandidate = currentEl;
					}
				}
			}
			currentEl = currentEl.parentElement;
		}
		return bestCandidate;
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
			'div[data-pagelet^="FeedUnit"]',
			'div[role="article"]',
			'div[data-pagelet^="Reels"]',
			'div[data-pagelet="Stories"]',
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

			// Detect if we hit a generic feed list container wrapper
			if (currentElement.parentElement && (currentElement.parentElement.getAttribute('role') === 'feed' || currentElement.parentElement.getAttribute('role') === 'list')) {
				return currentElement;
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
