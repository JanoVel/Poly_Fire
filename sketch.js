var initialParticles = 10; //Initial number of particles
var ps; //1st Particle System
var ps2; //2nd Particle System

function setup() {
  //Create a canvas, half the size fo the screen, it is resized through css
  createCanvas(windowWidth/2, windowHeight/2);
  noCursor();
  //Assign particle system objects to the p1 and p2 variables
  //the wouse position is halved because the canvas is resized through css
  ps = new ParticleSystem(createVector(mouseX/2, mouseY/2));
  ps2 = new ParticleSystem(createVector(width - mouseX/2, height - mouseY/2));
  //Fill the particle systems with an initial number of particles
  for(var i = 0; i < initialParticles; i++){
    ps.addParticle();
    ps2.addParticle();
  }
}

function draw() {
  background(237, 34, 93);
  //Update the origin of a particle system, update it, draw it and add a new particle
  ps.origin = createVector(mouseX/2, mouseY/2);
  ps.run();
  ps.addParticle();
  //Idem
  ps2.origin = createVector(width - mouseX/2, height - mouseY/2);
  ps2.run();
  ps2.addParticle();
}
//resize canvas is the browser is resized
function windowResized(){
  resizeCanvas(windowWidth/2, windowHeight/2);
}

class Particle{
  //Only input is location
  constructor(l){
    this.location = l;
    this.acceleration = createVector(0, -0.05);
    this.velocity = createVector(random(-1,1), random(2, 0));
    this.lifespan = 255;
  }
  //Check if particle is dead (lifespan is less than 0)
  isDead(){
    if(this.lifespan < 0.0){
      return true;
    } else{
      return false;
    }
  }
  //Update forces and lifespan
  update(){
    this.acceleration.x = map(noise(millis()), 0, 1, -0.1, 0.1);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2.0;
  }

}

class ParticleSystem{
  //Only input is location
  constructor(location){
    this.origin = location;
    this.particles = []; //Array to hold particles of the system
  }
  //New particles are created on the origin of the system
  addParticle(){
    this.particles.push(new Particle(this.origin));
  }
  //Draw the system
  run(){  
    beginShape(TRIANGLE_STRIP);
    //The points of the shape are the particle locations
    for(var i = 0; i < this.particles.length; i++){
      var p = this.particles[i];
      stroke(255, p.lifespan);//Stroke and fill opacity change according to lifespan
      fill(237, 34, 93, p.lifespan);
      p.update();
      vertex(p.location.x, p.location.y);
      if(p.isDead()){
        this.particles.splice(i, i+1); //Remove particle from the system if it is dead
      }
    }
    endShape();
  }
}
