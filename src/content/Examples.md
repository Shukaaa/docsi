## Examples

### Styling

You can write normal HTML in the Markdown files. <br/>
So you can easily assign classes to elements. <br/>

<div class="my-class">
    <p>My paragraph</p>
</div>

```html
<div class="my-class">
    <p>My paragraph</p>
</div>
```

Now you can create a new CSS file in the `css` folder and add the following code:

```css
.my-class {
    background-color: red;
}
```

The css file gets automatically imported in the `template.html` file, if it's in the `css` folder. <br/>

### Code Highlighting

You can use code highlighting in the Markdown files. <br/>
Just use the following syntax:

```js
console.log("Hello World!");
```

````markdown
```js
console.log("Hello World!");
```
````

> If you want to change the code highlighting theme, you can change it in the `highlight.css` file. <br/>

If you want to remove the highlighting, you can delete the `highlight.css` file and remove the following line in the `template.html` file:

```html
<!-- Highlight.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
```

### Images

You can use images in the Markdown files. <br/>
Just use the following syntax:

<img src="assets/logo.png" alt="Logo" style="width: 10%; height: 10%;" />

````markdown
![Logo](assets/logo.png)
````

or

```html
<img src="assets/logo.png" alt="Logo" />
```

> If you want to change the logo or add a new one, you can change it in the `assets` folder. <br/>

### Adding new pages

If you want to add a new page, you can create a new Markdown file in your `content` folder. <br/>
Then you have to register it in the `docsi.config.js` file. <br/>

```js
pageOrder: [
  "Introduction", 
  "Environment", 
  "Examples", 
  "NewPage"
]
...
```

> Please note that docsi only creates single page applications. <br/>
> So all theses pages will be rendered in the same HTML file. You can just define the order of the pages. <br/>

### Adding Scripts

If you want to add a new script, you can create a new JS file in the `js` folder. <br/>
You don't have to register it anywhere, it gets automatically imported in the `template.html` file, if you put it in the `js` folder. <br/>

<button onclick="alertHelloWord()">Add a new script!</button>

```html
<button onclick="alertHelloWord()">Add a new script!</button>
```

now you can create a new JS file in the `js` folder and add the following code:

```js
function alertHelloWord() {
    window.alert("Hello World!");
}
```

### template.html

The `template.html` file is the template file for the static site. <br/>
It contains the HTML structure of the static site. <br/>
You can add your own HTML code to it. <br/>

> There you can change the title of the static site. <br/>
