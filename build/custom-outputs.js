const fs = require('fs');
const tokens = require('../tokens/tokens.json');

// Helper to resolve token references
function resolveValue(value) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const path = value.slice(1, -1).replace('.value', '').split('.');
    let result = tokens;
    for (const key of path) {
      result = result[key];
    }
    return result.value;
  }
  return value;
}

// Generate CLI ANSI color map
function generateCLIColors() {
  const hexToAnsi = {
    '#10B981': '32',  // green (success)
    '#F59E0B': '33',  // yellow (warning)
    '#EF4444': '31',  // red (error)
    '#3B82F6': '34',  // blue (info)
    '#0066FF': '36',  // cyan (brand primary)
    '#7C3AED': '35',  // magenta (brand secondary)
    '#94A3B8': '90',  // bright black (tertiary text)
    '#64748B': '37',  // white (secondary text)
    '#0F172A': '97',  // bright white (primary text)
  };

  const cliColors = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    
    // Semantic colors
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    info: '\x1b[34m',
    
    // Brand colors
    primary: '\x1b[36m',
    secondary: '\x1b[35m',
    
    // Text hierarchy
    textPrimary: '\x1b[97m',
    textSecondary: '\x1b[37m',
    textTertiary: '\x1b[90m',
  };

  const output = `// CLI ANSI Color Codes
// Generated from design tokens

module.exports = ${JSON.stringify(cliColors, null, 2)};

// Usage example:
// const colors = require('./cli-colors');
// console.log(colors.success + 'Success!' + colors.reset);
// console.log(colors.error + 'Error!' + colors.reset);
`;

  fs.writeFileSync('outputs/cli/cli-colors.js', output);
  console.log('✔ Generated outputs/cli/cli-colors.js');
}

// Generate VS Code theme
function generateVSCodeTheme() {
  const theme = {
    name: "Design System Portfolio",
    type: "light",
    colors: {
      // Editor
      "editor.background": resolveValue(tokens.color.surface['bg-primary'].value),
      "editor.foreground": resolveValue(tokens.color.text.primary.value),
      "editorLineNumber.foreground": resolveValue(tokens.color.text.tertiary.value),
      "editorCursor.foreground": resolveValue(tokens.color.brand.primary.value),
      
      // Sidebar
      "sideBar.background": resolveValue(tokens.color.surface['bg-secondary'].value),
      "sideBar.foreground": resolveValue(tokens.color.text.secondary.value),
      "sideBarTitle.foreground": resolveValue(tokens.color.text.primary.value),
      
      // Activity Bar
      "activityBar.background": resolveValue(tokens.color.surface['bg-secondary'].value),
      "activityBar.foreground": resolveValue(tokens.color.text.primary.value),
      "activityBar.activeBorder": resolveValue(tokens.color.brand.primary.value),
      
      // Status Bar
      "statusBar.background": resolveValue(tokens.color.brand.primary.value),
      "statusBar.foreground": resolveValue(tokens.color.text.inverse.value),
      
      // Tabs
      "tab.activeBackground": resolveValue(tokens.color.surface['bg-primary'].value),
      "tab.inactiveBackground": resolveValue(tokens.color.surface['bg-secondary'].value),
      "tab.activeForeground": resolveValue(tokens.color.text.primary.value),
      "tab.inactiveForeground": resolveValue(tokens.color.text.secondary.value),
      
      // Panel
      "panel.background": resolveValue(tokens.color.surface['bg-primary'].value),
      "panelTitle.activeForeground": resolveValue(tokens.color.text.primary.value),
      
      // Input
      "input.background": resolveValue(tokens.color.surface['bg-primary'].value),
      "input.border": resolveValue(tokens.color.border.default.value),
      
      // Button
      "button.background": resolveValue(tokens.color.brand.primary.value),
      "button.foreground": resolveValue(tokens.color.text.inverse.value),
      
      // Lists
      "list.activeSelectionBackground": resolveValue(tokens.color.brand.primary.value) + '20',
      "list.hoverBackground": resolveValue(tokens.color.neutral['100'].value),
      
      // Terminal
      "terminal.ansiGreen": resolveValue(tokens.color.semantic.success.value),
      "terminal.ansiYellow": resolveValue(tokens.color.semantic.warning.value),
      "terminal.ansiRed": resolveValue(tokens.color.semantic.error.value),
      "terminal.ansiBlue": resolveValue(tokens.color.semantic.info.value),
    },
    tokenColors: [
      {
        scope: ["comment"],
        settings: {
          foreground: resolveValue(tokens.color.text.tertiary.value),
          fontStyle: "italic"
        }
      },
      {
        scope: ["string"],
        settings: {
          foreground: resolveValue(tokens.color.semantic.success.value)
        }
      },
      {
        scope: ["keyword", "storage"],
        settings: {
          foreground: resolveValue(tokens.color.brand.secondary.value)
        }
      },
      {
        scope: ["constant.numeric"],
        settings: {
          foreground: resolveValue(tokens.color.semantic.warning.value)
        }
      },
      {
        scope: ["entity.name.function"],
        settings: {
          foreground: resolveValue(tokens.color.brand.primary.value)
        }
      }
    ]
  };

  fs.writeFileSync('outputs/ide/vscode-theme.json', JSON.stringify(theme, null, 2));
  console.log('✔ Generated outputs/ide/vscode-theme.json');
}

// Run all generators
console.log('\nGenerating custom outputs...\n');
generateCLIColors();
generateVSCodeTheme();
console.log('\n✨ All custom outputs generated!\n');
