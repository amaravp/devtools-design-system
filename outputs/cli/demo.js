#!/usr/bin/env node

const colors = require('./cli-colors');

// Demo CLI output with design system colors

console.log('\n' + colors.bold + colors.primary + '╔════════════════════════════════════════╗' + colors.reset);
console.log(colors.bold + colors.primary + '║   Design System CLI Demo               ║' + colors.reset);
console.log(colors.bold + colors.primary + '╚════════════════════════════════════════╝' + colors.reset + '\n');

// Status messages
console.log(colors.success + '✓' + colors.reset + ' Build completed successfully');
console.log(colors.warning + '⚠' + colors.reset + ' 3 warnings detected in configuration');
console.log(colors.error + '✕' + colors.reset + ' Failed to connect to remote server');
console.log(colors.info + 'ℹ' + colors.reset + ' 2 updates available\n');

// Command output simulation
console.log(colors.bold + 'Running tests...' + colors.reset);
console.log(colors.dim + '  • API integration tests' + colors.reset);
console.log(colors.dim + '  • Unit tests' + colors.reset);
console.log(colors.dim + '  • E2E tests' + colors.reset);
console.log(colors.success + '\n✓ All tests passed (245ms)' + colors.reset + '\n');

// File operations
console.log(colors.bold + 'Files modified:' + colors.reset);
console.log(colors.textSecondary + '  modified:   ' + colors.textPrimary + 'src/components/Button.tsx' + colors.reset);
console.log(colors.textSecondary + '  modified:   ' + colors.textPrimary + 'src/styles/tokens.css' + colors.reset);
console.log(colors.textSecondary + '  created:    ' + colors.success + 'outputs/cli/demo.js' + colors.reset);
console.log(colors.textSecondary + '  deleted:    ' + colors.error + 'temp/cache.json' + colors.reset + '\n');

// Progress indicator
console.log(colors.primary + 'Deploying application...' + colors.reset);
const steps = [
  { name: 'Building bundle', status: 'success' },
  { name: 'Optimizing assets', status: 'success' },
  { name: 'Uploading to CDN', status: 'warning' },
  { name: 'Invalidating cache', status: 'success' }
];

steps.forEach(step => {
  const symbol = step.status === 'success' ? colors.success + '✓' : colors.warning + '⚠';
  console.log(`  ${symbol}${colors.reset} ${step.name}`);
});

console.log(colors.success + '\n✓ Deployment complete!' + colors.reset);
console.log(colors.textSecondary + '  URL: ' + colors.primary + 'https://your-app.example.com' + colors.reset + '\n');

// Help text
console.log(colors.bold + 'Available commands:' + colors.reset);
console.log(colors.primary + '  build' + colors.reset + colors.textSecondary + '    Build the project' + colors.reset);
console.log(colors.primary + '  test' + colors.reset + colors.textSecondary + '     Run test suite' + colors.reset);
console.log(colors.primary + '  deploy' + colors.reset + colors.textSecondary + '   Deploy to production' + colors.reset);
console.log(colors.primary + '  help' + colors.reset + colors.textSecondary + '     Show this help message' + colors.reset + '\n');
