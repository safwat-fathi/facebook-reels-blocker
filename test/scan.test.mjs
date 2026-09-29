// Selector regression check. Facebook's real DOM can't be tested here; keep this fixture in step with what breaks in the wild.
import test from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { scan, css, ATTR } from "../src/scan.ts";

const HTML = `<body>
<div role="navigation"><ul role="list"><li id="nav"><a href="/reel/?s=tab">Reels</a></li><li id="home"><a href="/">Home</a></li></ul></div>
<ul id="topbar"><li id="tophome"><span><a href="/" aria-current="page">Home</a></span></li><li id="topreels"><span><div><a aria-label="Reels" href="/reel/?s=tab">Reels</a></div></span></li><li id="topfriends"><span><a href="/friends/">Friends</a></span></li></ul>
<div id="composer"><div role="button">What's on your mind?</div></div>
<div id="wrap1"><div id="wrap2"><div aria-label="Stories" role="region" data-focus-target="stories_tray" id="tray"><h3>Stories</h3>
  <a href="/stories/create/">Create story</a><a href="/stories/1/x?source=story_tray">A's story</a></div></div></div>
<div data-pagelet="Stories" id="oldstories"><div role="button" aria-label="Reels" id="reelstab">Reels</div></div>
<div role="feed">
  <div role="article" id="reelpost"><a href="https://www.facebook.com/reel/123">watch</a></div>
  <div role="article" id="normal"><a href="/some.page">hello</a><div aria-label="Freelance work">x</div></div>
  <div role="article" id="pymk"><h3>People you may know</h3></div>
</div></body>`;

const doc = () => new JSDOM(HTML).window.document;
const on = { reels: true, stories: false, suggested: false };
const hidden = d => [...d.querySelectorAll(`[${ATTR}]`)].map(e => `${e.id}:${e.getAttribute(ATTR)}`).sort();

test("hides reels, leaves normal content alone (incl. 'Freelance' false positive)", () => {
	const d = doc();
	scan(d, on);
	assert.deepEqual(hidden(d), ["nav:reels", "reelpost:reels", "reelstab:reels", "topreels:reels"]);
});

test("stories and suggested only when their toggles are on", () => {
	const d = doc();
	scan(d, { reels: true, stories: true, suggested: true });
	assert.deepEqual(hidden(d), ["nav:reels", "oldstories:stories", "pymk:suggested", "reelpost:reels", "reelstab:reels", "topreels:reels", "wrap1:stories"]);
});

test("nothing is scanned when a section is off; css only lists enabled sections", () => {
	const d = doc();
	assert.equal(scan(d, { reels: false, stories: false, suggested: false }), 0);
	assert.deepEqual(hidden(d), []);
	assert.equal(css(on), `[${ATTR}="reels"]{display:none!important}`);
});
