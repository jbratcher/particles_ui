// Drawing and animating circles with random velocity and color
// Circles 'float' up to the top of the canvas and loop back to the bottom on repeat

// Report JS file connected

console.log("js connected");

// Declare variables

// Get color input

var colorInput = document.querySelector('#color');
var selectedColor = colorInput.value;
var test = document.querySelector('#color').value;

// Get radius input

var radInput = document.querySelector('#radius');
var selectedRad = radInput.value;

// Get horizontal speed input

var hInput = document.querySelector('#xspeed');
var selectedHspeed = hInput.value;

// Get vertical speed input

var vInput = document.querySelector('#yspeed');
var selectedVSpeed = vInput.value;

// Set up the canvas and size to container #canvas-display

var canvas = document.querySelector("#main-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set 2D context

var ctx = canvas.getContext("2d");

// Mouse coordiantes

var mouse = {
    x: undefined,
    y: undefined
};

// Get button element

const submitButton = document.querySelector('#submitChanges');

// Event Listeners

// Submit Changes when form button is clicked

submitButton.addEventListener('click', () => {
  init();
});

// Capture Mouse movement

window.addEventListener("mousemove",
    function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Responsive Canvas

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Utility Functions

function randomIntFromRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function getRandomColor() {
  let color = '#';
  color += ((1<<24)*Math.random()|0).toString(16);
  return color;
}

// Create Circle function

function Circle(x,y,dx,dy,rad,color, boundaryRight, boundaryLeft) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;
    this.boundaryRight = boundaryRight;
    this.boundaryLeft = boundaryLeft;
    var minRad = rad;
    var maxRad = (rad * 2);

    // Draw circle function

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    // Update circle position for animation

    this.update = function() {

        // Move circle to top once it reaches bottom

        if(this.y + this.rad < 0) {
            this.y = window.innerHeight;
        }

        if(this.x > boundaryRight || this.x < boundaryLeft) {
            this.dx = -this.dx;
        }

        // Increment position (x,y)

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity (mouse and circles)

        // Mouse detection for circle

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

            // Limit circle grow size

            if (this.rad < maxRad) {
                this.rad += 1;
            }

        // Limit circle shrink size

        } else if (this.rad > minRad) {
            this.rad -= 1;
        } else if (this.rad < this.minRad) {
            this.rad += 1;
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

    // Randomize circle value (position, velocity, fill and stroke color, and opacity)

    for (var i = 0; i < 100; i++) {
        var rad = radInput.value || randomIntFromRange(2,4);
        var x = Math.random() * (window.innerWidth - rad * 2);
        var y = Math.random() * (window.innerHeight - rad * 2);
        var dx = hInput.value || 0.2;
        var dy = -vInput.value || -randomIntFromRange(0.2,0.3);
        var color = colorInput.value || getRandomColor();
        var boundaryRight = x + rad;
        var boundaryLeft = x - rad;
        circles.push(new Circle(x,y,dx,dy,rad,color,boundaryRight,boundaryLeft));
    }

}

//  Animation function

function animation() {

    //Start loop

    requestAnimationFrame(animation);

    // Clear window after drawing circle

    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    // Draw the circles

    for(var i = 0; i < circles.length; i++) {
        circles[i].update();
    }

}

// Run

animation();
init();
