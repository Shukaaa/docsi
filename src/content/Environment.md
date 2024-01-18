## Environment

### Development
1. Install the grunt CLI. <br/>

```bash
npm install -g grunt-cli
```

2. Start the development server. <br/>

```bash
npm run dev
```

The development server will be started on `http://127.0.0.1:5173/temp/index.html`. <br/>
> Note: The development server is only for development purposes. <br/>

### Build
To build the static site, you can run `npm run build` in the root folder. <br/>
The static site will be generated in the `dist` folder. <br/>

### Folder Structure
```
- node_modules/
- src/
    - assets/
        - logo.png
    - content/
        - Environment.md
        - Examples.md
        - Introduction.md
    - css/
        - default.css
        - highlight.css
        - sidebar.css
    - js/
        - sidebar.js
    - template.html
- .gitignore
- docsi.config.js
- package.json
- package-lock.json
- README.md
- vite.config.js
```
- The `node_modules` folder contains all the dependencies. <br/>
- The `src` folder contains all the source files. <br/>
    - The `assets` folder contains all the assets. (changeable inside the config) <br/>
      - The `logo.png` file is the logo of the static site. <br/>
    - The `content` folder contains all the content files. (changeable inside the config) <br/>
      - All the files in the `content` folder will be converted to HTML. (Only Markdown is supported) <br/>
    - The `css` folder contains all the CSS files (All files get compressed to one file "`style.css`", changeable inside the config). <br/>
      - The `default.css` file is the default CSS file that contains the styling for the Markdown Elements. <br/>
      - The `highlight.css` file is the CSS file for the code highlighting theme. <br/>
      - The `sidebar.css` file is the CSS file for the sidebar. <br/>
    - The `js` folder contains all the JS files. (All files get compressed to one file "`script.js`", changeable inside the config). <br/>
      - The `sidebar.js` file is the JS file for the sidebar. <br/>
    - The `template.html` file is the template file for the static site. <br/>
- The `.gitignore` file contains all the files that should be ignored by git. <br/>
- The `docsi.config.js` file contains the configuration for the static site & build process (see more below). <br/>
- The `package.json` file contains all the dependencies and scripts. <br/>
- The `package-lock.json` file contains all the dependencies and their versions. <br/>
- The `README.md` file contains the documentation for the static site. <br/>
- The `vite.config.js` file contains the configuration for the development server. <br/>

> Important: Please make sure if you create a new file in content/ then you have to register it to the `docsi.config.js` file. <br/>

### Configuration
As you can see, there is a `docsi.config.js` file in the root folder. <br/>

```js
const docsiConfig = {
    // Order how pages are merged together
    pageOrder: [
        "Introduction",
        "Environment",
        "Examples"
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
```

- The `pageOrder` array contains the order of the pages and how they will be displayed. <br/>
- The `build` object contains the build options. <br/>
  - The `minifyJs` option minifies the JS files. <br/>
  - The `minifyCss` option minifies the CSS files. <br/>
  - The `buildDir` option specifies the build directory. <br/>
- The `fileLocations` object contains the file locations especially for the template file. <br/>
- The `folderLocations` object contains the folder locations. <br/>
- The `markdown` object gives you the ability to customize the markdown compiler. <br/>
  - The `preCompile` function gets called before the markdown gets compiled to HTML. <br/>
  - The `postCompile` function gets called after the markdown gets compiled to HTML. <br/>