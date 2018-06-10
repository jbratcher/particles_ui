# Particles UI

A UI for the Canvas Particles Library [link]([I'm an inline-style link](https://www.google.com))

### Version

0.0.3

## Install Dependencies

```bash
npm install 
```

## Compile Sass & Run Dev Server

gulp

```bash
gulp
```
OR

```bash
npm start
```

## Folder and File Structure

/src
    /css
    styles.css
        /fonts
        -fontawesome-webfont.eot
        -fontawesome-webfont.svg
        -fontawesome-webfont.ttf
        -fontawesome-webfont.wotf
        -fontawesome-webfont.wotf2
        -FontAwesome.otf
        /vendor
        -font-awesome.min.css
    /img
    /js
        -index.js
        -main.js
    /scss
    -styles.scss
-index.html
-gulpfile.js
-LICENSE
-package.json
-readme.md

## Bundle and minify compiled CSS and JS

```bash
gulp useref
```

## Bulid to dist from src

```bash
gulp build
```
## Clean (delete) dist

```bash
gulp clean:dist
```

## Features: 

* Uses Canvas Particle library to generate colored particles
* Uses HTML5 canvas to display particles
* Flexbox w/ media queries for responsiveness
* JS animation frames to continually update animation


## Future Features:

* expandable menu for large layout sizes
* more options such as number of particles, random colors, etc.


## Known "bugs"

* At 768x and above, canvas extends past viewport width on right side

#### Change Log

###### 0.0.3

* Added wall/nowall option, changed large layout for controls to columns

###### 0.0.2

* Added more options for customization, styling for interface

 
###### 0.0.1

* Initial commit

