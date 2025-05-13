class FacebookReelsBlocker {
	private isEnabled: boolean = true;
	private mutationObserver: MutationObserver | null = null;
	private browserAPI: any;
	private reelsSelectors: string[] = [
		// Selectors targeting Reels content
		'div[aria-label*="Reels"]',
		'div[role="button"][aria-label*="Reels"]',
		'a[href*="/reel/"]',
		'a[href*="facebook.com/reel"]',
		'div[data-pagelet="FeedUnit"]:has(a[href*="/reel/"])',
		// Additional selector for Reels section in the feed
		'div[data-pagelet="VideoChastiityControlledMediaChainingFeed"]',
		// Selectors for Reels in mobile view
		'div[data-focusable="true"]:has(> div > h2 > div > span.f2)',
	];

	constructor() {
		// Use the appropriate browser API
		this.browserAPI = typeof chrome !== "undefined" ? chrome : browser;
		this.initializeExtension();
	}

	private async initializeExtension(): Promise<void> {
		// Get enabled status from storage
		this.browserAPI.storage.sync.get("enabled", (result: any) => {
			this.isEnabled = result.enabled !== undefined ? result.enabled : true;
			if (this.isEnabled) {
				this.startBlocking();
			}
		});

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

	private blockReels(): void {
		this.reelsSelectors.forEach(selector => {
			document.querySelectorAll(selector).forEach(element => {
				this.hideElement(element as HTMLElement);
			});
		});
	}

	private hideElement(element: HTMLElement): void {
		// Find the closest post container
		const postContainer = this.findPostContainer(element);

		if (postContainer) {
			postContainer.style.display = "none";
			postContainer.setAttribute(
				"data-blocked-by-extension",
				"facebook-reels-blocker"
			);
		} else {
			// If we can't find a container, just hide the element itself
			element.style.display = "none";
			element.setAttribute(
				"data-blocked-by-extension",
				"facebook-reels-blocker"
			);
		}
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
			}
		});

		this.mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	private blockMobileReelsByHeader(): void {
		const REELS_TITLES = ["Reels", "ريلز"];

		// Find all span.f2 containing "Reels"
		document.querySelectorAll("span.f2").forEach(span => {
			const text = span.textContent?.trim();
			if (text && REELS_TITLES.includes(text)) {
				let current = span as HTMLElement | null;
				while (current && current.parentElement) {
					current = current.parentElement;
					if (
						current.matches(
							'div[data-mcomponent="MContainer"][data-type="container"]'
						) &&
						current.style.height &&
						parseInt(current.style.height) > 300
					) {
						this.hideElement(current as HTMLElement);
					}
				}
			}
		});
	}
}

// Initialize the blocker when the content script loads
new FacebookReelsBlocker();
