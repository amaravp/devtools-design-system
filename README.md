# Multi-Surface Design System

A cohesive design system that works seamlessly across web, IDE, and CLI prototypes. Built with [Style Dictionary](https://amzn.github.io/style-dictionary/) for token transformation.

## 🎯 Features

- **Single Source of Truth**: One `tokens.json` file drives all outputs
- **Multi-Surface Support**: Web (CSS), IDE (VS Code), CLI (ANSI colors)
- **Free & Portable**: Zero-cost tooling, easily adaptable
- **Developer-Friendly**: Minimal setup, maximum consistency

## 📁 Project Structure

```
design-system/
├── tokens/
│   └── tokens.json          # Single source of truth
├── build/
│   ├── config.js            # Style Dictionary config
│   └── custom-outputs.js    # Custom formatters (CLI, VS Code)
├── outputs/
│   ├── web/
│   │   ├── tokens.css       # CSS custom properties
│   │   ├── tokens.scss      # SCSS variables
│   │   └── demo.html        # Interactive demo
│   ├── cli/
│   │   ├── tokens.js        # JavaScript module
│   │   ├── cli-colors.js    # ANSI color codes
│   │   └── demo.js          # CLI demo script
│   └── ide/
│       ├── tokens.json      # Flat JSON
│       └── vscode-theme.json # VS Code theme
└── package.json
```

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Build All Outputs

```bash
npm run build        # Generate CSS, SCSS, JS, JSON
npm run build:custom # Generate CLI colors & VS Code theme
```

## 💻 Usage Examples

### Web (CSS Custom Properties)

```html
<link rel="stylesheet" href="outputs/web/tokens.css">
```

```css
.button {
  background: var(--color-brand-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  color: var(--color-text-inverse);
  transition: all var(--transition-base) var(--transition-ease);
}

.success-message {
  color: var(--color-semantic-success);
  font-size: var(--font-size-sm);
}
```

### CLI (ANSI Colors)

```javascript
const colors = require('./outputs/cli/cli-colors');

console.log(colors.success + '✓ Build completed' + colors.reset);
console.log(colors.error + '✕ Deployment failed' + colors.reset);
console.log(colors.primary + 'Running tests...' + colors.reset);
```

### IDE (VS Code Theme)

1. Copy `outputs/ide/vscode-theme.json` to your VS Code extensions folder:
   - macOS: `~/.vscode/extensions/mytheme/themes/`
   - Windows: `%USERPROFILE%\.vscode\extensions\mytheme\themes\`
   - Linux: `~/.vscode/extensions/mytheme/themes/`

2. Create a `package.json` in the extension folder:

```json
{
  "name": "design-system-theme",
  "displayName": "Design System Portfolio",
  "version": "1.0.0",
  "engines": { "vscode": "^1.0.0" },
  "contributes": {
    "themes": [{
      "label": "Design System Portfolio",
      "uiTheme": "vs",
      "path": "./themes/vscode-theme.json"
    }]
  }
}
```

3. Reload VS Code and select the theme from Preferences → Color Theme

## 🎨 Design Tokens Reference

### Colors

**Brand Colors**
- `--color-brand-primary`: #0066FF
- `--color-brand-secondary`: #7C3AED
- `--color-brand-accent`: #06B6D4

**Semantic Colors**
- `--color-semantic-success`: #10B981 (green)
- `--color-semantic-warning`: #F59E0B (yellow)
- `--color-semantic-error`: #EF4444 (red)
- `--color-semantic-info`: #3B82F6 (blue)

**Neutrals**
- `--color-neutral-0` to `--color-neutral-900`
- Use for backgrounds, text, borders

### Spacing

- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px
- `--spacing-2xl`: 48px
- `--spacing-3xl`: 64px

### Typography

**Font Families**
- `--font-family-sans`: System font stack
- `--font-family-mono`: Monospace stack

**Font Sizes**
- `--font-size-xs` (12px) to `--font-size-4xl` (36px)

**Font Weights**
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### Border Radius

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-full`: 9999px (pill shape)

### Shadows

- `--shadow-sm`: Subtle elevation
- `--shadow-base`: Standard card shadow
- `--shadow-md`: Medium elevation
- `--shadow-lg`: High elevation
- `--shadow-xl`: Maximum elevation

### Transitions

- `--transition-fast`: 150ms
- `--transition-base`: 200ms
- `--transition-slow`: 300ms
- `--transition-ease`: cubic-bezier(0.4, 0, 0.2, 1)

## 🔧 Customization

### Modifying Tokens

Edit `tokens/tokens.json` and rebuild:

```bash
npm run build
npm run build:custom
```

### Adding New Surfaces

Add a new platform to `build/config.js`:

```javascript
platforms: {
  // ... existing platforms
  
  reactNative: {
    transformGroup: 'react-native',
    buildPath: 'outputs/mobile/',
    files: [{
      destination: 'tokens.js',
      format: 'javascript/module'
    }]
  }
}
```

## 🎯 Design Principles

1. **Semantic Over Presentational**: Use `success` instead of `green`
2. **Consistent Spacing**: Stick to the spacing scale
3. **Accessibility First**: Maintain WCAG contrast ratios
4. **Mobile-First**: Design tokens work across all screen sizes
5. **Performance**: Sub-250ms load times for all assets

## 📊 Token Categories

| Category | Use Case | Example |
|----------|----------|---------|
| Brand | Primary identity, CTAs | `--color-brand-primary` |
| Semantic | Status indicators | `--color-semantic-success` |
| Surface | Backgrounds, cards | `--color-surface-bg-primary` |
| Text | Typography hierarchy | `--color-text-primary` |
| Border | Dividers, outlines | `--color-border-default` |

## 🚢 Deployment

### Web
- Deploy `outputs/web/tokens.css` to your CDN
- Import in HTML or CSS files

### CLI
- Package `outputs/cli/cli-colors.js` with your Node.js app
- Import and use ANSI codes

### IDE
- Distribute as VS Code extension
- Or share JSON file for manual installation

## 📝 License

Free to use for portfolio projects. Adapt as needed.

## 🔗 Resources

- [Style Dictionary Docs](https://amzn.github.io/style-dictionary/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [VS Code Theme Guide](https://code.visualstudio.com/api/extension-guides/color-theme)

---

Built with efficiency and portability in mind. Perfect for developer tools, prototypes, and portfolio projects.
