

new p5();

class particle {

  constructor(x, y, vx, vy, mass) {
      this.pos = createVector(x, y);
      this.mass = mass;
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(vx, vy);
      this.path = [];

  }

  show() {
      strokeWeight(2);
      noFill();
      beginShape();

      for (let v of this.path) {
        vertex(v.x, v.y);
      }

      endShape();

      stroke(50);
      strokeWeight(2);
      fill(255);
      circle(this.pos.x, this.pos.y, 20);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.set(0, 0);

    this.path.push(this.pos.copy());
    
  }

  applyForce(force) {
    let a = p5.Vector.div(force, this.mass);
    this.acceleration.add(a);
  }

  attract(par) {
    let f = p5.Vector.sub(this.pos, par.pos);
    let distSq = f.magSq();
    let G = 10;
    let mag = G * (this.mass * par.mass) / distSq;
    f.setMag(mag);
    par.applyForce(f);
  }

  collide(par) {
    let dist = p5.Vector.sub(this.pos, par.pos);
    let distance = dist.mag();
    if (distance <= 2) {
      this.acceleration.setMag(0 , 0);
      this.velocity.setMag(0 , 0);
    }
  }

}

let bodies = [];
let statics = [];

function mouseClicked() {
  statics.push(new particle(mouseX, mouseY, 0, 0, 7));
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    bodies.push(new particle(mouseX, mouseY, 0, -0.5, 1))
  }
  else if (keyCode == RIGHT_ARROW) {
    bodies.push(new particle(mouseX, mouseY, 0.5, 0, 1))
  }
  else if (keyCode == LEFT_ARROW) {
    bodies.push(new particle(mouseX, mouseY, -0.5, 0, 1))
  }
  else if (keyCode == DOWN_ARROW) {
    bodies.push(new particle(mouseX, mouseY, 0, 0.5, 1))
  }
}



function setup() {
  createCanvas(1500, 900);
}

function draw() {
  background(210);
  

  for (let s of statics) {
    s.show();
    s.path.length = 0
    for (let p of bodies) {
      s.attract(p);
      p.collide(s);
    }
  }

  for (let p of bodies) {
    p.show();
    p.update();

    for (let b of bodies) {
      if(p != b) {
        b.attract(p);
        b.collide(p);
      }

    }
  }
}


