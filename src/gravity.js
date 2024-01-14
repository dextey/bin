const canvas = document.getElementById("gravity");

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  start();
});

window.addEventListener("click", () => {
  start();
});

const ctx = canvas.getContext("2d");

const colors = ["#B2A4FF", "#FFB4B4", "#FFDEB4"];

const gravity = 1;
const friction = 0.8;

class Circle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();

    if (this.y + this.radius + this.dy > HEIGHT) this.dy = -this.dy * friction;
    else this.dy += gravity;
    this.y += this.dy;

    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) this.dx = -this.dx;
    this.x += this.dx;

    if (this.y + this.radius > HEIGHT) this.dx = 0;
  }
}

let balls = [];

const maxBalls = 100;

function getRandom(x, y) {
  return Math.floor(Math.random() * (y - x + 1) + x);
}

function start() {
  balls = [];
  for (let i = 0; i < maxBalls; i++) {
    const radius = getRandom(15, 60);
    balls.push(
      new Circle(
        getRandom(radius, WIDTH - radius),
        getRandom(100, HEIGHT / 3),
        getRandom(-2, 2),
        getRandom(1, 3),
        radius,
        colors[getRandom(0, 3)]
      )
    );
  }
}

start();

function init() {
  window.requestAnimationFrame(init);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let index = 0; index < balls.length; index++) {
    balls[index].update();
  }
}

init();
