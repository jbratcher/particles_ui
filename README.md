# Particles UI

A UI extending the [Canvas Particles](https://github.com/jbratcher/canvas-particles-js) library

Customize your own canvas with particles and get the js snippet for use in your own projects.

[Demo](https://jbratcher.github.io/particles_ui/#)


### Version

0.1.4


## Install Dependencies

```bash
npm install
```

## Compile Code and Start Live Server

gulp

```bash
gulp
```
OR

```bash
npm start
```

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

* Uses Canvas Particles to generate colored particles as base/default canvas
* Uses HTML5 canvas to display particles
* Flexbox w/ media queries for responsiveness
* JS animation frames to continually update animation
* Generates JS snippet from user input for use in other projects
* Developed with Typescript, Sass, and Gulp


## Future Features:

* Clean up js files

## Known "bugs"

* 'get snippet' button won't open modal unless changes are made to the input (sometimes)


#### Change Log

###### 0.1.4

* Refactored js to Typescript

###### 0.1.3

* Made menu open/close animations smoother, no refocus when opened/closed

###### 0.1.2

* Added expandable modal for generated snippet

###### 0.1.1

* Changed desktop main window height to fit inside browser window height

###### 0.1.0

* Added expandable menu for control panel

###### 0.0.3

* Added wall/nowall option, changed large layout for controls to columns

###### 0.0.2

* Added more options for customization, styling for interface


###### 0.0.1

* Initial commit
