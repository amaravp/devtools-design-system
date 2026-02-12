#!/bin/bash

echo "🎨 Setting up Design System Portfolio..."
echo ""

# Fix permissions on all files
echo "Fixing permissions..."
chmod -R u+rwx .
find . -type f -name "*.js" -exec chmod +x {} \;
find . -type f -name "*.sh" -exec chmod +x {} \;

echo "✓ Permissions fixed"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --quiet

echo "✓ Dependencies installed"
echo ""

# Build design tokens
echo "Building design tokens..."
npm run build --silent
npm run build:custom --silent

echo "✓ Design tokens built"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  • View web demo: open outputs/web/demo.html"
echo "  • Run CLI demo: node outputs/cli/demo.js"
echo "  • Read docs: cat README.md"
echo ""
