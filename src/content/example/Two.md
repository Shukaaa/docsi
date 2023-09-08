## Environment

### Folder Structure
```
- node_modules/
- src/
    - assets/
        - logo.png
    - content/
        - example/
            - One.md
            - Two.md
            - Three.md
        - Introduction.md
    - css/
        - default.css
        - highlight.css
        - sidebar.css
    - js/
        - sidebar.js
    - template.html
- .gitignore
- docsi.config.json
- package.json
- package-lock.json
- README.md
- vite.config.js
```
- The `node_modules` folder contains all the dependencies. <br/>
- The `src` folder contains all the source files. <br/>
    - The `assets` folder contains all the assets. <br/>
      - The `logo.png` file is the logo of the static site. <br/>
    - The `content` folder contains all the content files. <br/>
      - All the files in the `content` folder will be converted to HTML. (Currently only Markdown is supported) <br/>
    - The `css` folder contains all the CSS files. <br/>
      - The `default.css` file is the default CSS file that contains the styling for the Markdown Elements. <br/>
      - The `highlight.css` file is the CSS file for the code highlighting theme. <br/>
      - The `sidebar.css` file is the CSS file for the sidebar. <br/>
    - The `js` folder contains all the JS files. <br/>
      - The `sidebar.js` file is the JS file for the sidebar. <br/>
    - The `template.html` file is the template file for the static site. <br/>
- The `.gitignore` file contains all the files that should be ignored by git. <br/>
- The `docsi.config.json` file contains the configuration for the static site. <br/>
- The `package.json` file contains all the dependencies and scripts. <br/>
- The `package-lock.json` file contains all the dependencies and their versions. <br/>
- The `README.md` file contains the documentation for the static site. <br/>
- The `vite.config.js` file contains the configuration for the development server. <br/>

> Important: Please make sure if you create a new file in content/ then you have to register it to the `docsi.config.json` file. <br/>

### Configuration
As you can see, there is a `docsi.config.json` file in the root folder. <br/>

```json
{
    "pageOrder": [
        "Introduction",
        "example/One",
        "example/Two",
        "example/Three"
    ],
    "build": {
      "minifyJs": true,
      "minifyCss": true,
      "buildDir": "dist"
    }
}
```

The `pageOrder` array contains the order of the pages and how they will be displayed. <br/>
The `build` object contains the build options. <br/>

### Development
1. Install all dependencies. <br/>

```bash
npm install
```

2. Install the grunt CLI. <br/>

```bash
npm install -g grunt-cli
```

3. Start the development server. <br/>

```bash
npm run dev
```

The development server will be started on `http://127.0.0.1:5173/temp/index.html`. <br/>
> Note: The development server is only for development purposes. <br/>
> The static site will be generated in the `dist` folder. <br/>

### Build
To build the static site, you can run `npm run build` in the root folder. <br/>
The static site will be generated in the `dist` folder. <br/>