const canvas = document.getElementById("bounce");
let WIDTH, HEIGHT;

WIDTH = window.innerWidth;
HEIGHT = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
});

const ctx = canvas.getContext("2d");

const colors = ["#FF6969", "#C70039", "#141E46", "#FAEF5D"];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
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

for (let i = 0; i < 20; i++) {
  x = Math.random() * (WIDTH - 100) + 40;
  y = Math.random() * (HEIGHT - 100) + 40;
  dx = (Math.random() - 0.5) * speed;
  dy = (Math.random() - 0.5) * speed;

  circles.push(new Circle(x, y, dx, dy, 30));
}

function draw() {
  window.requestAnimationFrame(draw);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

draw();
