// Animating particles with randomized or user-selected attribute values

// Set up the canvas and size to container #main-canvas

const canvas = <HTMLCanvasElement>document.querySelector("#main-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Set 2D context

const ctx = canvas.getContext("2d");

// Get button element

const submitButton = document.querySelector('#submitChanges');

const resetButton = document.querySelector('#resetChanges');

// Event Listeners

// Make changes to particle attribute values

submitButton.addEventListener('click', () => {
  onChange();
});

// Reset changes made to default values

resetButton.addEventListener('click', () => {
    init();
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

// Create Circle constructor

function Circle(x,y,dx,dy,rad,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.color = color;

    // Draw circle

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    // Update circle position for animation

    this.update = function() {

        // Increment position (x,y)

        this.x += this.dx;
        this.y += this.dy;

        // Get Wall value from input and set logic appropriately

        const selectedWall = <HTMLInputElement>document.querySelector('#walls');


        if (selectedWall.value === 'wall') {

            // Change y direction when wall is hit

            if (this.y + this.rad > window.innerHeight || this.y + this.rad < 0) {
                this.dy = -this.dy;
            }

            // Change x direction when wall is hit

            if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
                this.dx = -this.dx;
            }

        } else if (selectedWall.value === 'nowall') {

            // Move to bottom if top if reached, to top if bottom is reached

            if(this.y < 0) {
                this.y = window.innerHeight;
            } else if(this.y > window.innerHeight) {
                this.y = 0;
            } else {
                this.y = this.y;
            }

            // Move to start if end is reached and vice versa

            if(this.x < 0) {
                this.x = window.innerWidth;
            } else if(this.x > window.innerWidth) {
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

let circles = [];

function onChange() {

    // Reset circles array

    circles = [];

    // Get user inputs from controls form

    const numParticles = <HTMLInputElement>document.querySelector('#particles-number');
    const selectedRad = <HTMLInputElement>document.querySelector('#radius');
    const selectedColor = <HTMLInputElement>document.querySelector('#color');
    const selectedHSpeed = <HTMLInputElement>document.querySelector('#xspeed');
    const selectedHSF = <HTMLInputElement>document.querySelector('#xfactor');
    const selectedVSpeed = <HTMLInputElement>document.querySelector('#yspeed');
    const selectedVSF = <HTMLInputElement>document.querySelector('#yfactor');

    // Randomize circle value (position, velocity, fill and stroke color, and opacity)

    for (let i = 0; i < parseInt(numParticles.value); i++) {
        const rad = Math.abs(parseInt(selectedRad.value)) || randomIntFromRange(2,4);
        const x = Math.random() * (window.innerWidth - rad * 2);
        const y = Math.random() * (window.innerHeight - rad * 2);
        const dx = (parseInt(selectedHSpeed.value,10) * randomIntFromRange(0,selectedHSF.value)) || randomIntFromRange(0.1, 5);
        const dy = -(parseInt(selectedVSpeed.value,10) * randomIntFromRange(0,selectedVSF.value)) || -randomIntFromRange(0.1, 5);
        const color = selectedColor.value || getRandomColor();
        circles.push(new Circle(x,y,dx,dy,rad,color));
    }

}

function init() {

    // Reset circles array

    circles = [];

    // Set defaults for circles

    for (let i = 0; i < randomIntFromRange(20, 100); i++) {
        const rad = randomIntFromRange(1,5);
        const x = Math.random() * (window.innerWidth - rad * 2);
        const y = Math.random() * (window.innerHeight - rad * 2);
        const dx = randomIntFromRange(0.1, 5);
        const dy = -randomIntFromRange(0.1, 5);
        const color = getRandomColor();
        circles.push(new Circle(x,y,dx,dy,rad,color));
    }

}

//  Animation function

function animation() {

    // Start loop

    requestAnimationFrame(animation);

    // Clear window after drawing circle

    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    // Draw the circles

    for(let i = 0; i < circles.length; i++) {
        circles[i].update();
    }

}

// Run

animation();
init();
