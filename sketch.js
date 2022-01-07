

new p5();

class particle {

  constructor(x, y, vx, vy, mass) {
      this.pos = createVector(x, y);
      this.mass = mass;
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(vx, vy);
      this.path = [];
      this.r = this.mass*2;
      
      

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
      circle(this.pos.x, this.pos.y, 2 * this.r);
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
    if (distance <= this.r ) {
      this.acceleration.setMag(0 , 0);
      this.velocity.setMag(0 , 0);
    }
  }


}

let slider;
let slider2;
let bodies = [];
let statics = [];

function mouseClicked() {
  if(mouseY < height) {
  statics.push(new particle(mouseX, mouseY, 0, 0, slider.value()));
    }
}



function keyPressed() {
  if (keyCode == UP_ARROW) {
    bodies.push(new particle(mouseX, mouseY, 0, -slider2.value(), slider.value()))
  }
  else if (keyCode == RIGHT_ARROW) {
    bodies.push(new particle(mouseX, mouseY, slider2.value(), 0, slider.value()))
  }
  else if (keyCode == LEFT_ARROW) {
    bodies.push(new particle(mouseX, mouseY, -slider2.value(), 0, slider.value()))
  }
  else if (keyCode == DOWN_ARROW) {
    bodies.push(new particle(mouseX, mouseY, 0, slider2.value(), slider.value()))
  }
}

function resetPatricles() {
  bodies.length = 0;
  statics.length = 0;
}

function clearTrails() {
  for (let p of bodies) {
    p.path.length = 0
  }
  for (let s of statics) {
    s.path.length = 0
  }
}


function setup() {
  createCanvas(1920, 900);

 
  button = createButton('Clear Trails');
  button.position(50,940);
  button.mousePressed(clearTrails);

  button = createButton('Reset');
  button.position(50,910);
  button.mousePressed(resetPatricles);

  label = createDiv('Mass');
  label.position(200, 930);  
  slider = createSlider(1, 15, 100);
  slider.position(-45, -20);
  slider.parent(label);

  label2 = createDiv('Velocity');
  label2.position(400, 930);
  slider2 = createSlider(0, 3, 100, 0.1);
  slider2.position(-40, -20);
  slider2.parent(label2);
  
  

}

function draw() {
  background(210);
  

  for (let s of statics) {
    s.show();
    s.path.length = 0
    for (let p of bodies) {
      s.attract(p);
      p.collide(s);
      s.collide(p);
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


