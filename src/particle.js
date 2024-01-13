const canvas = document.getElementById("particle");
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

const colors = ["#161853", "#292C6D", "#FAEF5D", "#EC255A"];

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

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
    if (this.x + this.radius >= WIDTH || this.x - this.radius < 0) this.dx = -this.dx;
    if (this.y + this.radius > HEIGHT || this.y - this.radius < 0) this.dy = -this.dy;

    if (
      mouse.x - this.x < 150 &&
      mouse.x - this.x > -150 &&
      mouse.y - this.y < 150 &&
      mouse.y - this.y > -150
    ) {
      if (this.radius < 20) this.radius += 50;
      //   console.log({ mx: mouse.x, x: this.x, r: this.radius });
    } else if (this.radius > 7) {
      this.radius -= 3;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circles = [];
const particles = 200;
const speed = 2;

for (let i = 0; i < particles; i++) {
  x = Math.random() * (WIDTH - 100) + 40;
  y = Math.random() * (HEIGHT - 100) + 40;
  dx = (Math.random() - 0.5) * speed;
  dy = (Math.random() - 0.5) * speed;
  radius = Math.floor(Math.random() * 10 + 3);
  circles.push(new Circle(x, y, dx, dy, radius));

  circles.push(new Circle(x, y, dx, dy, radius));
}

function draw() {
  window.requestAnimationFrame(draw);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
}

draw();
