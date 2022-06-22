var seed = Math.random() * 9821;
var mySize;
var circle_r;
var space;
var m;
let xspacing;
let w;
let maxwaves;
let theta;
let amplitude = new Array(maxwaves);
let dx = new Array(maxwaves);
let yvalues;
let colors0 = "292929-3055ff-e45240-b1b1b1-ffffff".split("-").map((a) => "#" + a);
let colors1 = "5d565c-d7d7d7-c0dee4-edb136-e07958".split("-").map((a) => "#" + a);
let colors2 = "7382ce-9fb7f4-12177d-9bb5e9-7486af".split("-").map((a) => "#" + a);
let colors3 = "1b1b1b-292929-f3f3f3-222222-ff0000".split("-").map((a) => "#" + a);
let colors4 = "eda492-d59c95-af3918-d9b6b5-853532".split("-").map((a) => "#" + a);
let colors5 = "f86fcd-97d183-240ce8-b0e298-202020".split("-").map((a) => "#" + a);
var color_1,color_2,colorbg;

function setup() {
  randomSeed(seed);
  mySize = min(windowWidth, windowHeight);
	pixelDensity(5);
  translate((width - mySize) / 2, (height - mySize) / 2);
  createCanvas(mySize, mySize);
	color_1 = random([colors1, colors2, colors3, colors4, colors5]);
	color_2 = colors0;
	colorbg = random(color_1);
  background(colorbg);
  circle_r = (mySize / 3) * 2;
  w = width *2;
  m = random(1,5);
  xspacing = random(1,5);
  maxwaves = random(1, 10);
  theta = 0.0;
	

  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 30);
    let period = random(100, 500);
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  randomSeed(seed);
  push();
  noStroke();
	let color_c = random(color_2);
  fill(color_c);
  translate(width / 2, height / 2);
  rotate(random(PI / 2, TAU));
	// circle(0, 0, circle_r);

	drawingContext.shadowColor = color(color_c);
    drawingContext.shadowOffsetX = random(3);
    drawingContext.shadowOffsetY = random(3);
    drawingContext.shadowBlur = 0;
  for (let i = 0; i < 5; i += 5) {
    push();
    translate(i, height/3*2+i * m + m);
    calcWave();
    renderWave();
    pop();
  }
  pop();
  m -= 1;
  // if (m < -random(10,30)) noLoop();
}

function calcWave() {
 

  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
	 theta += random(0.01, 0.05);
}

function renderWave() {
  noFill();
  stroke(colorbg);
	strokeWeight(1);
  for (let x = 0; x < yvalues.length; x++) {
   ellipse(
      -width + x * xspacing,
      yvalues[x],
		 random(100),random(100)
    );
		// random(0.25, 2),random(height / 8, height * 2)
  }
}

function keyTyped() {
	if (key === "s" || key === "S") {
		saveCanvas("Cloud", "png");
	}
}