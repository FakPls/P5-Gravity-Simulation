

new p5();

class particle {

  constructor(x, y, mass) {
      this.pos = createVector(x, y);
      this.mass = mass;
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, 0);
      this.path = [];

  }

  show() {
      stroke(50);
      strokeWeight(2);
      fill(255);
      circle(this.pos.x, this.pos.y, 20);

      strokeWeight(2);
      noFill();
      beginShape();

      for (let v of this.path) {
        vertex(v.x, v.y);
      }

      endShape();
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


  
}



m1 = new particle(300, 300, 5);
m2 = new particle(300, 500, 5);
//m3 = new particle(200, 500, 1);
m1.velocity.set(0.2);
m2.velocity.set(-0.3);

function setup() {
  createCanvas(1500, 900);
}

function draw() {
  background(210);
  m1.show();
  m1.update();
  m1.attract(m2);
  // m1.attract(m3);

  m2.show();
  m2.update();
  m2.attract(m1);
  // m2.attract(m3);

  // m3.show();
  // m3.update();
  // m3.attract(m1);
  // m3.attract(m2);
  
  
  
  
}


