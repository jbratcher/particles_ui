'use strict';

// Drawing and animating circles with random velocity and color
// Circles 'float' up to the top of the canvas and loop back to the bottom on repeat

// Report JS file connected

console.log("js connected");

// Declare variables

// Get user inputs from controls form

// Get color input

var colorInput = document.querySelector('#color');
var selectedColor = colorInput.value;

// Get radius input

var radInput = document.querySelector('#radius');
var selectedRad = radInput.value;

// Get horizontal speed input

var hInput = document.querySelector('#xspeed');
var selectedHspeed = hInput.value;

// Add speed factor (num range randomized for variable speed)
var hsfInput = document.querySelector('#xfactor');
var selectedHSF = hsfInput.value;

// Get vertical speed input

var vInput = document.querySelector('#yspeed');
var selectedVSpeed = vInput.value;

// Add speed factor (num range randomized for variable speed)
var vsfInput = document.querySelector('#yfactor');
var selectedVSF = vsfInput.value;

var walls = document.querySelector('#walls');
var selectedWall = walls.value;

// Set up the canvas and size to container #canvas-display

var canvas = document.querySelector("#main-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Get button element

var submitButton = document.querySelector('#submitChanges');

// Set 2D context

var ctx = canvas.getContext("2d");

// Event Listeners

// Submit Changes when form button is clicked

submitButton.addEventListener('click', function () {
    init();
});

// Responsive Canvas

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Utility Functions

function randomIntFromRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function getRandomColor() {
    var color = '#';
    color += ((1 << 24) * Math.random() | 0).toString(16);
    return color;
}

// Create Circle constructor

function Circle(x, y, dx, dy, rad, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    // Draw circle 

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    // Update circle position for animation

    this.update = function () {

        // Increment position (x,y)

        this.x += this.dx;
        this.y += this.dy;

        // Draw Circle

        // Get Wall value from input and set logic appropriately

        if (walls.value === 'wall') {

            // Change y direction when wall is hit

            if (this.y + this.rad > window.innerHeight || this.y + this.rad < 0) {
                this.dy = -this.dy;
            }

            // Change x direction when wall is hit

            if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
                this.dx = -this.dx;
            }
        } else if (walls.value === 'nowall') {

            // Move to bottom if top if reached, to top if bottom is reached

            if (this.y < 0) {
                this.y = window.innerHeight;
            } else if (this.y > window.innerHeight) {
                this.y = 0;
            } else {
                this.y = this.y;
            }

            // Move to start if end is reached and vice versa

            if (this.x < 0) {
                this.x = window.innerWidth;
            } else if (this.x > window.innerWidth) {
                this.x = 0;
            } else {
                this.x = this.x;
            }
        }

        this.draw();
    };
}

// Create circles array

var circles = [];

function init() {

    // Reset circles array

    circles = [];

    var numParticles = document.querySelector('#particles-number').value;

    // Randomize circle value (position, velocity, fill and stroke color, and opacity)

    for (var i = 0; i < numParticles; i++) {
        var rad = Math.abs(radInput.value) || randomIntFromRange(2, 4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = parseInt(hInput.value, 10) * randomIntFromRange(0, hsfInput.value) || randomIntFromRange(0.1, 5);
        var dy = parseInt(-vInput.value, 10) * randomIntFromRange(0, vsfInput.value) || -randomIntFromRange(0.1, 5);
        var color = colorInput.value || getRandomColor();
        circles.push(new Circle(x, y, dx, dy, rad, color));
    }
}

//  Animation function

function animation() {

    //Start loop

    requestAnimationFrame(animation);

    // Clear window after drawing circle

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw the circles

    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

// Run

animation();
init();

// Modify