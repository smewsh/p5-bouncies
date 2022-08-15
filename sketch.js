var orbs = [];
var canvX = 100;
var canvY = 100;

var mouseFlag = false;
var mouseCounter = 0;

var count = 0;


function setup() {
    canvX = windowWidth;
    canvY = windowHeight;
    createCanvas(canvX, canvY);
}

class Orb {
    constructor(x, y, xV, yV, size, color) {
        this.x = x;
        this.y = y;
        this.xV = xV;
        this.yV = yV;
        this.size = size;
        this.color = color;
        this.xM = xV * size;
        this.yM = yV * size;
    }
    move() {
        console.log(this.xV + ', ' + this.yV);


        this.x += this.xV;
        this.y += this.yV;

        if ((this.x >= canvX - (this.size / 2) || (this.x <= (this.size / 2)))) {
            this.xV *= -1;
        }

        if ((this.y >= canvY - (this.size / 2)) || (this.y <= (this.size / 2))) {
            this.yV *= -1;
        }

    }


    display() {
        fill(this.color);
        circle(this.x, this.y, this.size);
    }

    collision() {
        for (var i = 0; i < orbs.length; i++) {
            var instOrb = orbs[i];
            if (instOrb === this) {
                break;
            }
            var distX = abs((instOrb.x - (instOrb.size / 2)) - (this.x - (this.size / 2)));
            var distY = abs((instOrb.y - (instOrb.size / 2)) - (this.y - (this.size / 2)));

            if (distX <= 0 && distY <= 0) {
                print('bounce!');
            }


        }
    }


}

function draw() {
    background('black');

    noStroke();

    for (var i = 0; i < orbs.length; i++) {
        orbs[i].collision();
        orbs[i].move();
        orbs[i].display();

    }

    fill('white')
    textSize(width / 60)
    textAlign(CENTER, CENTER)

    text('EDDIE KRANZ\ned@kranz.au', canvX / 2, canvY / 2)

    //create orb on click
    if (mouseIsPressed) {
        mouseFlag = true;
    }

    if (mouseFlag) {
        mouseCounter += 1;
    }

    if (mouseCounter >= 1) {
        orbs.push(new Orb(mouseX, mouseY, canvX / 200, canvY / 200, canvX / 169, color(random(255), random(255), random(255))));
        count++;
        mouseCounter = 0;
        mouseFlag = false;
    }
}