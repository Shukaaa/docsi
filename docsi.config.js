const docsiConfig = {
  // Order how pages are merged together
  pageOrder: [
    "Introduction",
    "Environment",
    "Examples",
  ],
  build: {
    minifyJs: true,
    minifyCss: true,
    buildDir: "dist"
  },
  fileLocations: {
    template: "src/template.html"
  },
  folderLocations: {
    assets: "src/assets",
    pages: "src/content",
    css: "src/css",
    js: "src/js"
  },
  // Custom markdown compiler options
  markdown: {
    preCompile: (md) => {
      // checkbox - [ ] || - [x]
      md = md.replace(/- \[ ]/g, '- <input type="checkbox" disabled>');
      md = md.replace(/- \[x]/g, '- <input type="checkbox" checked disabled>');

      // mark special words ==word==
      md = md.replace(/==(.+?)==/g, '<mark>$1</mark>');

      // sup numbers ^2^ to <sup>2</sup>
      md = md.replace(/\^(\d+)\^/g, '<sup>$1</sup>');

      return md;
    },
    postCompile: (html) => {
      return html;
    }
  }
}

module.exports = docsiConfig;