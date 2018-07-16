var numParticlesTemp = document.querySelector('#particles-number');
var selectedRadTemp = document.querySelector('#radius');
var selectedColorTemp = document.querySelector('#color');
var selectedHSpeedTemp = document.querySelector('#xspeed');
var selectedHSFTemp = document.querySelector('#xfactor');
var selectedVSpeedTemp = document.querySelector('#yspeed');
var selectedVSFTemp = document.querySelector('#yfactor');
var selectedWallTemp = document.querySelector('#walls');
var template;
var getSnippet = document.querySelector('#get-snippet');
getSnippet.addEventListener('click', function () {
    var template = "    var canvas = document.querySelector(\"canvas\");\n    canvas.width = canvas.clientWidth;\n    canvas.height = canvas.clientHeight;\n\n    window.addEventListener(\"resize\", function() {\n      canvas.width = window.innerWidth;\n      canvas.height = window.innerHeight;\n    });\n\n    var ctx = canvas.getContext(\"2d\");\n\n    var circles = [];\n\n    function randomIntFromRange(min, max) {\n      return Math.random() * (max - min + 1) + min;\n    }\n\n    function getRandomColor() {\n      let color = '#';\n      color += ((1<<24)*Math.random()|0).toString(16);\n      return color;\n    }\n\n    function Circle(x,y,dx,dy,rad,color) {\n      this.x = x;\n      this.y = y;\n      this.dx = dx;\n      this.dy = dy;\n      this.rad = rad;\n      this.color = color;\n\n      this.draw = function() {\n        ctx.beginPath();\n        ctx.arc(this.x, this.y, this.rad, 0, Math.PI *2);\n        ctx.fillStyle = this.color;\n        ctx.fill();\n      };\n\n      this.update = function() {\n        this.x += this.dx;\n        this.y += this.dy;\n\n        " + (selectedWallTemp.value === 'wall'
        ?
            "if (this.y + this.rad > window.innerHeight || this.y + this.rad < 0) {\n          this.dy = -this.dy;\n        }\n\n        if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {\n          this.dx = -this.dx;\n        }"
        :
            "if(this.y < 0) {\n          this.y = window.innerHeight;\n        } else if(this.y > window.innerHeight) {\n          this.y = 0;\n        } else {\n          this.y = this.y;\n        }\n\n        if(this.x < 0) {\n          this.x = window.innerWidth;\n        } else if(this.x > window.innerWidth) {\n          this.x = 0;\n        } else {\n          this.x = this.x;\n        }") + "\n\n        this.draw();\n\n        };\n\n      }\n\n      function init() {\n\n        circles = [];\n\n        for (var i = 0; i < " + numParticlesTemp.value + "; i++) {\n            var rad = Math.abs(" + selectedRadTemp.value + ") || randomIntFromRange(2,4);\n            var x = Math.random() * (window.innerWidth - rad * 2);\n            var y = Math.random() * (window.innerHeight - rad * 2);\n            var dx = (parseInt(" + selectedHSpeedTemp.value + ",10) * randomIntFromRange(0," + selectedHSFTemp.value + ")) || randomIntFromRange(0.1, 5);\n            var dy = (parseInt(-" + selectedVSpeedTemp.value + ",10) * randomIntFromRange(0," + selectedVSFTemp.value + ")) || -randomIntFromRange(0.1, 5);\n            var color = " + selectedColorTemp.value + " || getRandomColor();\n            circles.push(new Circle(x,y,dx,dy,rad,color));\n        }\n\n      }\n\n      function animation() {\n\n        requestAnimationFrame(animation);\n\n        ctx.clearRect(0,0,window.innerWidth, window.innerHeight);\n\n        for(let i = 0; i < circles.length; i++) {\n            circles[i].update();\n        }\n\n      }\n\n      animation();\n      init();\n";
    // set modal textarea text value to template
    var snippetBox = document.querySelector('#snippet');
    snippetBox.textContent = template;
});
