const canvas = document.getElementById("bounce");

const WIDTH = window.innerWidth - 16;
const HEIGHT = window.innerHeight - 16;

canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${255 - 23.5 - ((Math.random() + 0.5) * 2) / y},${
      255 - 23.5 - ((Math.random() - 0.5) * 20) / x
    },0)`;
    ctx.fill();
    ctx.lineWidth = 3;
  }

  update() {
    this.draw();
    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) this.dx = -this.dx;
    if (this.y + this.radius > HEIGHT || this.y - this.radius < 0) this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
  }
}

const circles = [];

const speed = 5;

for (let i = 0; i < 10; i++) {
  x = Math.random() * (WIDTH - 100) + 40;
  y = Math.random() * (HEIGHT - 100) + 40;
  dx = (Math.random() - 0.5) * speed;
  dy = (Math.random() - 0.5) * speed;

  circles.push(new Circle(x, y, dx, dy, 30));
}

function draw() {
  window.requestAnimationFrame(draw);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

draw();
