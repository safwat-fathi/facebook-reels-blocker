// DOM scanning, kept free of browser-extension APIs so it can be tested against a plain jsdom document.
export const ATTR = "data-reels-blocked";
export const SECTIONS = ["reels", "stories", "suggested"] as const;
export type Section = (typeof SECTIONS)[number];
export type Toggles = Record<Section, boolean>;

// If Facebook changes its markup and blocking stops, these are the lists to update.
const REEL_SELECTORS = [
	'div[aria-label*="Reel"]',
	'a[href*="/reel/"]',
	'a[href*="/reels"]',
	'a[href*="facebook.com/reel"]',
	'a[href*="/share/r/"]',
	'div[data-sigil*="reel"]',
	'div[data-store*="reel"]',
].join(",");
const REEL_HEADERS = ["Reels", "ريلز", "릴스", "リール", "短视频"];
const SUGGESTED_HEADERS = ["Suggested for you", "People you may know"];

const MOBILE_SELECTORS = [
	'div[data-mcomponent="MContainer"]',
	'div[data-actual-height="460"]',
	'div[data-actual-height="464"]',
	'div[style*="height:460px"]',
	'div[style*="height:464px"]',
	'div[data-sigil="mtop-section"]',
	'div[data-sigil="mComposite"]',
	"div[data-tracking-duration-id]",
].join(",");
// Stories pagelet is deliberately absent: a Reels tab inside it must not take the Stories tray with it.
const POST_SELECTORS =
	'div[data-pagelet^="FeedUnit"],div[role="article"],div[data-pagelet^="Reels"]';

// data-focus-target is locale-independent (the tray's aria-label is translated); the pagelet is the older layout.
const STORIES_SELECTORS = '[data-focus-target="stories_tray"],[data-pagelet="Stories"]';

export const css = (t: Toggles) =>
	SECTIONS.filter(s => t[s])
		.map(s => `[${ATTR}="${s}"]{display:none!important}`)
		.join("");

function mobileContainer(el: HTMLElement): HTMLElement | null {
	let best: HTMLElement | null = null;
	// Limit to 6 levels to avoid hiding the main page wrapper.
	for (let cur: HTMLElement | null = el, i = 0; cur && cur.tagName !== "BODY" && i < 6; cur = cur.parentElement, i++) {
		if (!cur.matches(MOBILE_SELECTORS)) continue;
		const height = parseInt(cur.getAttribute("data-actual-height") ?? "0");
		const sigil = cur.getAttribute("data-sigil") ?? "";
		if (height === 460 || height === 464 || (height > 300 && (sigil.includes("mtop") || sigil.includes("mComposite")))) {
			return cur;
		}
		if (!best && cur.getAttribute("data-mcomponent") === "MContainer") best = cur;
	}
	return best;
}

// Also hide up to 3 wrapper divs that hold nothing but the tray, so no empty gap is left behind.
function soleWrapper(el: HTMLElement): HTMLElement {
	let top = el;
	for (let i = 0; i < 3; i++) {
		const p = top.parentElement;
		if (!p || p.tagName === "BODY" || p.matches('[role="main"]') || p.childElementCount !== 1 || p.querySelector('[role="article"],[role="feed"]')) break;
		top = p;
	}
	return top;
}

function postContainer(el: HTMLElement): HTMLElement | null {
	for (let cur: HTMLElement | null = el; cur && cur.tagName !== "BODY"; cur = cur.parentElement) {
		if (cur.matches(POST_SELECTORS)) return cur;
		// A native <ul>/<ol> item (e.g. the top-bar tabs has no role="list"): hide the <li> so its slot collapses too.
		if (cur.tagName === "LI" && /^[UO]L$/.test(cur.parentElement?.tagName ?? "")) return cur;
		const role = cur.parentElement?.getAttribute("role");
		if (role === "feed" || role === "list") return cur;
	}
	return null;
}

function byText(doc: Document, texts: string[]): HTMLElement[] {
	// texts are constants, so interpolating them into XPath is safe.
	const xpath = texts
		.map(t => `//h2[contains(., '${t}')] | //h3[contains(., '${t}')] | //span[text()='${t}'] | //div[text()='${t}' and @data-mcomponent="TextArea"]`)
		.join(" | ");
	const snap = doc.evaluate(xpath, doc, null, 7 /* ORDERED_NODE_SNAPSHOT_TYPE */, null);
	const out: HTMLElement[] = [];
	for (let i = 0; i < snap.snapshotLength; i++) out.push(snap.snapshotItem(i) as HTMLElement);
	return out;
}

// Marks matches with data-reels-blocked=<section>; the injected stylesheet does the hiding.
// Returns how many top-level elements are currently hidden.
export function scan(doc: Document, t: Toggles): number {
	const mark = (els: Iterable<HTMLElement>, section: Section, resolve: (el: HTMLElement) => HTMLElement | null) => {
		for (const el of els) {
			if (el.closest(`[${ATTR}="${section}"]`)) continue;
			resolve(el)?.setAttribute(ATTR, section);
		}
	};

	if (t.reels) {
		const reelContainer = (el: HTMLElement) => mobileContainer(el) || postContainer(el) || el;
		mark(doc.querySelectorAll<HTMLElement>(REEL_SELECTORS), "reels", reelContainer);
		mark(byText(doc, REEL_HEADERS), "reels", reelContainer);
	}
	if (t.stories) mark(doc.querySelectorAll<HTMLElement>(STORIES_SELECTORS), "stories", soleWrapper);
	if (t.suggested) mark(byText(doc, SUGGESTED_HEADERS), "suggested", postContainer);

	const active = SECTIONS.filter(s => t[s]).map(s => `[${ATTR}="${s}"]`).join(",");
	if (!active) return 0;
	return [...doc.querySelectorAll(active)].filter(el => !el.parentElement?.closest(active)).length;
}
