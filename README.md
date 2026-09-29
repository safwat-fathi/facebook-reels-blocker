# Facebook Reels Blocker

A browser extension that automatically blocks Facebook Reels content from appearing in your Facebook feed. Available for both Chrome and Firefox browsers.

## Features

- Hides Facebook Reels in the feed, trays and sidebar/menu shortcuts, and redirects Reel pages to the home feed
- Optional: hide the Stories tray and "Suggested for you" / "People you may know" units (off by default)
- Master switch and per-section switches in the popup; changes apply immediately, no reload
- Per-tab badge showing how many items were hidden
- Same behaviour on Chrome and Firefox (desktop and Android), one shared MV3 manifest
- No data collected, no network requests; only the `storage` permission plus access to `facebook.com`

## Installation from source

Requires Node.js 22.18+ and pnpm.

```bash
git clone https://github.com/safwat-fathi/facebook-reels-blocker.git
cd facebook-reels-blocker
pnpm install
pnpm build          # dist/chrome and dist/firefox
```

- **Chrome:** `chrome://extensions` → Developer mode → Load unpacked → `dist/chrome`
- **Firefox:** `about:debugging#/runtime/this-firefox` → Load Temporary Add-on → `dist/firefox/manifest.json` (Firefox 140+; Android 142+)

## How it works

`src/scan.ts` finds Reel elements (links, labels, section headers) and tags their container with
`data-reels-blocked="<section>"`. `src/content.ts` injects one stylesheet that hides the enabled sections, so toggling
a switch just rewrites that stylesheet. A throttled MutationObserver picks up content Facebook adds later.
`src/background.ts` redirects Reel URLs and sets the badge. `src/shared.ts` picks `browser` (Firefox, promises)
over `chrome` and holds the setting defaults.

## Development

```
src/manifest.json   single source; the build strips the other browser's background key
src/scan.ts         selectors + DOM scanning (unit-tested)
src/content.ts, background.ts, popup.ts, shared.ts
popup.html, icons/
scripts/build.mjs   esbuild bundle -> dist/chrome, dist/firefox (version comes from package.json)
test/               node:test + jsdom
```

Scripts: `pnpm build`, `build:chrome`, `build:firefox`, `typecheck`, `test`, `lint` (web-ext, Firefox build), `zip` (store packages in `dist/zip`).

If Facebook changes its markup and something stops being hidden, update the selector lists at the top of `src/scan.ts`
and add the offending snippet to `test/scan.test.mjs`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This extension is not affiliated with, authorized by, endorsed by, or in any way officially connected with Facebook, Inc. The name Facebook as well as related names, marks, emblems, and images are registered trademarks of their respective owners.
