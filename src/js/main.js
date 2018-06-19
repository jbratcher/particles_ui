



const getSnippet = document.querySelector('#get-snippet');

getSnippet.addEventListener('click', () => {
    
    // get user inputs via element.value
    
    var numParticlesTemp = document.querySelector('#particles-number').value;
    var selectedRadTemp = document.querySelector('#radius').value;
    var selectedColorTemp = document.querySelector('#color').value;
    var selectedHSpeedTemp = document.querySelector('#xspeed').value;
    var selectedHSFTemp = document.querySelector('#xfactor').value;
    var selectedVSpeedTemp = document.querySelector('#yspeed').value;
    var selectedVSFTemp = document.querySelector('#yfactor').value;
   
    
    // generate output snippet
    
    var template = `
                        var canvas = document.querySelector(canvas);
                        canvas.width = canvas.clientWidth;
                        canvas.height = canvas.clientHeight;
                        
                        window.addEventListener("resize", function() {
                            canvas.width = window.innerWidth;
                            canvas.height = window.innerHeight;
                        });
                        
                        var ctx = canvas.getContext("2d");
                        
                        var circles = [];
                    
                        
                        function randomIntFromRange(min, max) {
                            return Math.random() * (max - min + 1) + min;
                        }
                        
                        function getRandomColor() {
                          let color = '#';
                          color += ((1<<24)*Math.random()|0).toString(16);
                          return color;
                        }
                        
                        function Circle(x,y,dx,dy,rad,color) {
                            this.x = x;
                            this.y = y;
                            this.dx = dx;
                            this.dy = dy;
                            this.rad = rad;
                            this.color = color;
                        
                            this.draw = function() {
                                ctx.beginPath();
                                ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2);
                                ctx.fillStyle = this.color;
                                ctx.fill();
                            };
                        
                            this.update = function() {
                                
                                this.x += this.dx;
                                this.y += this.dy;
                        
                        
                                var selectedWall = document.querySelector('#walls').value;
                        
                                
                                if (selectedWall === 'wall') {
                                    
                        
                                    if (this.y + this.rad > window.innerHeight || this.y + this.rad < 0) {
                                        this.dy = -this.dy;
                                    }
                                    
                                    if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
                                        this.dx = -this.dx;
                                    } 
                                    
                                } else if (selectedWall === 'nowall') {
                                    
                                    if(this.y < 0) {
                                        this.y = window.innerHeight;
                                    } else if(this.y > window.innerHeight) {
                                        this.y = 0;
                                    } else {
                                        this.y = this.y;
                                    }
                                
                                    if(this.x < 0) {
                                        this.x = window.innerWidth;
                                    } else if(this.x > window.innerWidth) {
                                      this.x = 0;
                                    } else {
                                        this.x = this.x;
                                    }
                                    
                                }
                        
                                this.draw();
                        
                            };
                        
                        }
                        
                        
                        function init() {
                        
                            circles = [];
                             
                            for (var i = 0; i < ${numParticlesTemp}; i++) {
                                var rad = Math.abs(${selectedRadTemp}) || randomIntFromRange(2,4);
                                var x = Math.random() * (window.innerWidth - rad * 2);
                                var y = Math.random() * (window.innerHeight - rad * 2);
                                var dx = (parseInt(${selectedHSpeedTemp},10) * randomIntFromRange(0,${selectedHSFTemp})) || randomIntFromRange(0.1, 5);
                                var dy = (parseInt(-${selectedVSpeedTemp},10) * randomIntFromRange(0,${selectedVSFTemp})) || -randomIntFromRange(0.1, 5);
                                var color = ${selectedColorTemp} || getRandomColor();
                                circles.push(new Circle(x,y,dx,dy,rad,color));
                            }
                        
                        }
                        
                        function animation() {
                        
                            requestAnimationFrame(animation);
                        
                            ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
                        
                            for(let i = 0; i < circles.length; i++) {
                                circles[i].update();
                            }
                        
                        }
                        
                        animation();
                        init();
                    `;
    
    // open modal with snippet to copy/paste
    
        // select closed modal
        // add class to expand modal
        // add template string to modal 
    
    
});