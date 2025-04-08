# Facebook Reels Blocker

A browser extension that automatically blocks Facebook Reels content from appearing in your Facebook feed. Available for both Chrome and Firefox browsers.

## Features

- Blocks Facebook Reels content from appearing in your news feed
- Simple toggle to enable or disable the extension
- Works across all Facebook pages
- Runs efficiently with minimal performance impact
- Cross-browser support for Chrome and Firefox

## Installation

### From Source

#### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

#### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/facebook-reels-blocker.git
   cd facebook-reels-blocker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Build the extension:
   ```bash
   npm run build
   # or
   yarn build
   ```

   This will create two directories in `dist/`:
   - `chrome/` - Chrome-compatible extension
   - `firefox/` - Firefox-compatible extension

#### Installing in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the upper right
3. Click "Load unpacked" and select the `dist/chrome` folder
4. The extension should now be active and visible in your toolbar

#### Installing in Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Navigate to your project's `dist/firefox` directory and select the `manifest.json` file
4. The extension should now be active and visible in your toolbar

Note: For permanent installation in Firefox, the extension would need to be signed and submitted to the Firefox Add-ons store.

## Usage

1. Once installed, the extension will automatically block Reels content on Facebook
2. Click the extension icon in your browser toolbar to open the popup menu
3. Use the toggle switch to enable or disable the extension
4. Changes take effect immediately without needing to refresh the page

## How It Works

The extension uses content scripts to identify and hide Facebook Reels content using CSS selectors. It employs a MutationObserver to continuously monitor the page for new Reels content and hide it as it appears.

The main components are:
- **Content Script**: Identifies and hides Facebook Reels elements
- **Background Script**: Handles extension initialization and tab management
- **Popup Interface**: Provides user controls for enabling/disabling the extension
- **Storage API**: Remembers user preferences across browser sessions

## Development

### Project Structure

```
facebook-reels-blocker/
├── package.json
├── tsconfig.json
├── popup.html
├── src/
│   ├── background.ts
│   ├── content.ts
│   ├── popup.ts
│   ├── manifest.v2.json        # Firefox manifest
│   ├── manifest.v3.json        # Chrome manifest
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
└── dist/                       # Generated during build
    ├── chrome/                 # Chrome extension files
    └── firefox/                # Firefox extension files
```

### Build Commands

- Build for both browsers: `npm run build` or `yarn build`
- Build for Chrome only: `npm run build:chrome` or `yarn build:chrome`
- Build for Firefox only: `npm run build:firefox` or `yarn build:firefox`
- Watch mode (for development): `npm run watch` or `yarn watch`

### Customizing

If Facebook updates their UI and the extension stops working, you may need to update the selectors in the `reelsSelectors` array in `content.ts`. Look for elements with "Reels" in their attributes or URL paths to identify new selectors.

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
