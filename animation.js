
// Loop duration
let duration = 5;

let animationColor = '#3399ff';

let animationBackground = 255;
// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Render loop that draws shapes with p5
function draw(){
  // For consistent sizing regardless of portrait/landscape
  const dim = Math.min(width, height);
  
  // Black background
  background(animationBackground);
  
  // Stroke only with a specific join style and thickness
  noFill();
  
  stroke(animationColor);

  // Get time in seconds
  const time = millis() / 1000;
  
  // Get a 'playhead' from 0..1
  // We use modulo to keep it within 0..1
  const playhead = time / duration % 1;

  // A "start" position as XY coordinate
  const start = [ width/2, height/7 ];
  
  // An "end" position as XY coordinate
  const end = [ width/2, height/1.15];
  
  // Get a value that goes from -1..1 based on playhead
  // We use 2PI to create a seamless loop
  let t0 = sin(playhead * PI * 2);
  // Now we map the -1..1 to 0..1 values
  t0 = t0 * 0.5 + 0.5;

  // Now interpolate X and Y positions separately from
  // 'start' to 'end' coordinates
  const x = lerp(start[0], end[0], t0);
  const y = lerp(start[1], end[1], t0);

  // As an exercise, you could also try animating the
  // circle radius and stroke weight
  const r = dim * 0.3;
  
  
  // We will scale everything to the minimum edge of the canvas
  const minDim = min(width/2, height);
  
  // Size is a fraction of the screen
  // const size = minDim * 0.5;
  

  // Get an animated value from 0..1
  // We use playhead * 2PI to get a full rotation
  const anim = sin(playhead * PI * 4) * 0.5 + 0.5;
  
  const thickness = minDim * 0.2 * anim;
  
  strokeWeight(thickness);
  
  ellipse(x, y, r, r);
}




