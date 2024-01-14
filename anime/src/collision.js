const canvas = document.getElementById("collision");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  start();
});

const mouse = {
  x: 10,
  y: 10,
};

window.addEventListener("click", () => {
  start();
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

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
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
  }

  update(particles) {
    this.draw();

    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) this.dy = -this.dy;

    // for (let i = 0; i < balls.length; i++) {
    //   if (this !== balls[i]) {
    //     const dist = distance(balls[i].x, balls[i].y, this.x, this.y);
    //     // if (dist - 400 < 0) {
    //     //   this.dx = balls[i].dx;
    //     //   this.dy = balls[i].dy;
    //     //   this.x = -balls[i].x;
    //     //   this.y = -balls[i].y;
    //     // }
    //   }
    // }

    this.x -= this.dx;
    this.y += this.dy;
  }
}

// Pythagores theorem helps to find the distance between 2 coordiantes

const distance = (x1, y1, x2, y2) => {
  const distx = x2 - x1;
  const disty = y2 - y1;

  const distance = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2));

  return distance;
};

const random = (x, y) => {
  return Math.floor(Math.random() * (y - x + 1) + x);
};

let balls = [];
const maxBalls = 12;

const checkExists = (pos) => {
  let collide = false;
  balls.forEach((dis) => {
    const dist = distance(dis.x, dis.y, pos.x, pos.y);

    if (dist < 410) collide = true;
  });

  return collide;
};

const getXY = () => {
  while (true) {
    let x = random(200, window.innerWidth - 200);
    let y = random(200, window.innerHeight - 200);

    if (!checkExists({ x, y })) return { x, y };
  }
};

const start = () => {
  balls = [];

  for (let i = 0; i < maxBalls; i++) {
    const { x, y } = getXY();

    balls.push(new Circle(x, y, 1, 1, 20, "#E96479"));
  }
};

const init = () => {
  window.requestAnimationFrame(init);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < balls.length; i++) {
    balls[i].update(balls);
  }
};

start();
init();
