# Component Patterns Guide

Core patterns for maintaining consistency across web, IDE, and CLI surfaces.

## 🎯 Philosophy

Each pattern translates across surfaces with appropriate adaptations:
- **Web**: Rich interactivity with hover states
- **IDE**: Integrated with editor context
- **CLI**: Text-based with ANSI colors

## 1. Status Indicators

### Purpose
Communicate state (success, warning, error, info) consistently.

### Web Implementation
```css
.status {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  gap: var(--spacing-sm);
}

.status-success {
  background: color-mix(in srgb, var(--color-semantic-success) 10%, transparent);
  color: var(--color-semantic-success);
}
```

### CLI Implementation
```javascript
const colors = require('./cli-colors');

function showStatus(type, message) {
  const symbols = {
    success: colors.success + '✓' + colors.reset,
    warning: colors.warning + '⚠' + colors.reset,
    error: colors.error + '✕' + colors.reset,
    info: colors.info + 'ℹ' + colors.reset
  };
  console.log(`${symbols[type]} ${message}`);
}
```

### IDE Implementation
Use semantic colors in status bar and problem markers:
```json
{
  "statusBar.background": "#10B981",  // success
  "statusBar.foreground": "#FFFFFF"
}
```

## 2. Action Buttons / Commands

### Purpose
Primary, secondary, and tertiary actions with clear hierarchy.

### Web Implementation
```css
.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base) var(--transition-ease);
}

.btn-primary {
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
}

.btn-secondary {
  background: transparent;
  color: var(--color-brand-primary);
  border: 2px solid var(--color-brand-primary);
}
```

### CLI Implementation
```javascript
// Highlight primary commands
console.log(colors.bold + colors.primary + 'Available commands:' + colors.reset);
console.log(colors.primary + '  build' + colors.reset + colors.textSecondary + '    Build the project' + colors.reset);
```

### IDE Implementation
Use brand colors for primary actions in command palette and buttons:
```json
{
  "button.background": "#0066FF",
  "button.foreground": "#FFFFFF"
}
```

## 3. Information Hierarchy

### Purpose
Establish clear visual hierarchy for headings, body text, and metadata.

### Web Implementation
```css
h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.body-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: var(--font-line-height-base);
}

.metadata {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}
```

### CLI Implementation
```javascript
// Title
console.log(colors.bold + colors.primary + '═══ Project Overview ═══' + colors.reset);

// Body
console.log(colors.textPrimary + 'Building application...' + colors.reset);

// Metadata
console.log(colors.textTertiary + 'Last updated: 2 hours ago' + colors.reset);
```

### IDE Implementation
```json
{
  "editorGroupHeader.tabsBackground": "#F8FAFC",
  "tab.activeForeground": "#0F172A",
  "tab.inactiveForeground": "#64748B"
}
```

## 4. Input Patterns

### Purpose
Forms, prompts, and user input with consistent styling.

### Web Implementation
```css
input, textarea {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans);
  transition: border-color var(--transition-base);
}

input:focus {
  outline: none;
  border-color: var(--color-brand-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-primary) 10%, transparent);
}
```

### CLI Implementation
```javascript
// Using readline or inquirer
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(colors.primary + '? ' + colors.reset + 'Project name: ', (answer) => {
  console.log(colors.textSecondary + 'Using name: ' + colors.textPrimary + answer + colors.reset);
  rl.close();
});
```

### IDE Implementation
```json
{
  "input.background": "#FFFFFF",
  "input.border": "#CBD5E1",
  "inputOption.activeBorder": "#0066FF"
}
```

## 5. Feedback Mechanisms

### Purpose
Progress indicators, loading states, and confirmations.

### Web Implementation
```css
.progress-bar {
  height: 4px;
  background: var(--color-neutral-200);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-brand-primary);
  transition: width var(--transition-slow) var(--transition-ease);
}

.spinner {
  border: 3px solid var(--color-neutral-200);
  border-top: 3px solid var(--color-brand-primary);
  border-radius: var(--radius-full);
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}
```

### CLI Implementation
```javascript
// Simple progress
function showProgress(step, total) {
  const percent = Math.round((step / total) * 100);
  const bar = '█'.repeat(Math.floor(percent / 5)) + '░'.repeat(20 - Math.floor(percent / 5));
  process.stdout.write(`\r${colors.primary}${bar}${colors.reset} ${percent}%`);
}

// Or use a library like ora
const ora = require('ora');
const spinner = ora('Loading...').start();
// Later: spinner.succeed('Done!');
```

### IDE Implementation
```json
{
  "progressBar.background": "#0066FF"
}
```

## 6. Cards / Containers

### Purpose
Group related content with consistent elevation.

### Web Implementation
```css
.card {
  background: var(--color-surface-bg-primary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-border-subtle);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}
```

### CLI Implementation
```javascript
// Box drawing characters
console.log(colors.textSecondary + '┌─────────────────────┐' + colors.reset);
console.log(colors.textSecondary + '│ ' + colors.textPrimary + 'Configuration      ' + colors.textSecondary + '│' + colors.reset);
console.log(colors.textSecondary + '├─────────────────────┤' + colors.reset);
console.log(colors.textSecondary + '│ ' + colors.textSecondary + 'Port: 3000         ' + colors.textSecondary + '│' + colors.reset);
console.log(colors.textSecondary + '└─────────────────────┘' + colors.reset);
```

### IDE Implementation
```json
{
  "panel.background": "#FFFFFF",
  "panel.border": "#E2E8F0"
}
```

## 7. Code Blocks

### Purpose
Display code snippets with syntax highlighting awareness.

### Web Implementation
```css
.code-block {
  background: var(--color-surface-bg-tertiary);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  overflow-x: auto;
}

.code-inline {
  background: var(--color-surface-bg-tertiary);
  padding: 2px var(--spacing-xs);
  border-radius: var(--radius-sm);
  font-family: var(--font-family-mono);
  font-size: 0.9em;
}
```

### CLI Implementation
```javascript
// Highlight code snippets
console.log(colors.textSecondary + 'Example:' + colors.reset);
console.log(colors.dim + '  const result = ' + colors.primary + 'await' + colors.dim + ' fetch(url);' + colors.reset);
```

### IDE Implementation
Uses token colors in theme:
```json
{
  "tokenColors": [
    {
      "scope": ["keyword"],
      "settings": { "foreground": "#7C3AED" }
    },
    {
      "scope": ["string"],
      "settings": { "foreground": "#10B981" }
    }
  ]
}
```

## Pattern Usage Matrix

| Pattern | Web | CLI | IDE | Notes |
|---------|-----|-----|-----|-------|
| Status Indicators | Badge w/ icon | ANSI + symbol | Status bar color | Use semantic colors |
| Action Buttons | Button element | Highlighted text | Command palette | Primary = brand color |
| Info Hierarchy | H1-H6 + text | Bold + colors | Tab/panel titles | 3 levels: primary/secondary/tertiary |
| Input Patterns | Form elements | readline/inquirer | Settings UI | Focus state = brand color |
| Feedback | Progress bar | Spinner/progress | Progress indicator | Consistent timing |
| Cards | Elevated divs | Box drawing | Panels | Use shadows appropriately |
| Code Blocks | Pre/code elements | Syntax highlighting | Editor itself | Mono font always |

## Best Practices

1. **Always use semantic tokens** over raw values
2. **Match interaction patterns** to the surface (hover on web, no hover on CLI)
3. **Maintain color meaning** across surfaces (green = success everywhere)
4. **Use appropriate spacing** for the medium (tighter on CLI, more generous on web)
5. **Test accessibility** (contrast ratios, screen reader support)

## Quick Reference

```javascript
// Status colors
success: green (#10B981)
warning: yellow (#F59E0B)
error: red (#EF4444)
info: blue (#3B82F6)

// Text hierarchy
primary: --color-text-primary (darkest)
secondary: --color-text-secondary (medium)
tertiary: --color-text-tertiary (lightest)

// Action hierarchy
primary: --color-brand-primary (most prominent)
secondary: --color-brand-secondary (alternative)
tertiary: neutral with border (subtle)
```

---

Use these patterns as building blocks. Adapt them to your specific use case while maintaining the design system's core principles.
