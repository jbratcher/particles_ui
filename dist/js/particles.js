"use strict";

// Animating particles with randomized or user-selected attribute values

// Set up the canvas and size to container #main-canvas

var canvas = document.querySelector("#main-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set 2D context

var ctx = canvas.getContext("2d");

// Get button element

var submitButton = document.querySelector('#submitChanges');

var resetButton = document.querySelector('#resetChanges');

// Event Listeners

// Make changes to particle attribute values

submitButton.addEventListener('click', function () {
    init();
});

// Reset changes made to default values

resetButton.addEventListener('click', function () {
    reset();
});

// Responsive Canvas

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

        // Get Wall value from input and set logic appropriately

        var selectedWall = document.querySelector('#walls').value;

        if (selectedWall === 'wall') {

            // Change y direction when wall is hit

            if (this.y + this.rad > window.innerHeight || this.y + this.rad < 0) {
                this.dy = -this.dy;
            }

            // Change x direction when wall is hit

            if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
                this.dx = -this.dx;
            }
        } else if (selectedWall === 'nowall') {

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

        // Draw Circle

        this.draw();
    };
}

// Create circles array

var circles = [];

function init() {

    // Reset circles array

    circles = [];

    // Get user inputs from controls form

    var numParticles = document.querySelector('#particles-number').value;
    var selectedRad = document.querySelector('#radius').value;
    var selectedColor = document.querySelector('#color').value;
    var selectedHSpeed = document.querySelector('#xspeed').value;
    var selectedHSF = document.querySelector('#xfactor').value;
    var selectedVSpeed = document.querySelector('#yspeed').value;
    var selectedVSF = document.querySelector('#yfactor').value;

    // Randomize circle value (position, velocity, fill and stroke color, and opacity)

    for (var i = 0; i < numParticles; i++) {
        var rad = Math.abs(selectedRad) || randomIntFromRange(2, 4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = parseInt(selectedHSpeed, 10) * randomIntFromRange(0, selectedHSF) || randomIntFromRange(0.1, 5);
        var dy = parseInt(-selectedVSpeed, 10) * randomIntFromRange(0, selectedVSF) || -randomIntFromRange(0.1, 5);
        var color = selectedColor || getRandomColor();
        circles.push(new Circle(x, y, dx, dy, rad, color));
    }
}

function reset() {

    // Reset circles array

    circles = [];

    // Set defaults for circles

    for (var i = 0; i < 100; i++) {
        var rad = randomIntFromRange(2, 4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = randomIntFromRange(0.1, 5);
        var dy = -randomIntFromRange(0.1, 5);
        var color = getRandomColor();
        circles.push(new Circle(x, y, dx, dy, rad, color));
    }
}

//  Animation function

function animation() {

    // Start loop

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