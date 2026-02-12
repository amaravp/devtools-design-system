module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    // Web: CSS Custom Properties
    css: {
      transformGroup: 'css',
      buildPath: 'outputs/web/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    
    // Web: SCSS variables
    scss: {
      transformGroup: 'scss',
      buildPath: 'outputs/web/',
      files: [{
        destination: 'tokens.scss',
        format: 'scss/variables'
      }]
    },
    
    // CLI: JavaScript module
    js: {
      transformGroup: 'js',
      buildPath: 'outputs/cli/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/module-flat'
      }]
    },
    
    // IDE: JSON for VS Code themes
    json: {
      transformGroup: 'js',
      buildPath: 'outputs/ide/',
      files: [{
        destination: 'tokens.json',
        format: 'json/flat'
      }]
    }
  }
};
