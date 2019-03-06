let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1lX = 0;
let eye1lY = 0;
let eye2lX = 0;
let eye2lY = 0;
 
var cnv;

function centerCanvas() 
{
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) * 1.5;
  cnv.position(x, y);
}

function setup() {
  cnv=createCanvas(600,600);
  centerCanvas();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function windowResized() {
  centerCanvas();
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;
    let e1X = poses[0].pose.keypoints[1].position.x;
    let e1Y = poses[0].pose.keypoints[1].position.y;
    let e2X = poses[0].pose.keypoints[2].position.x;
    let e2Y = poses[0].pose.keypoints[2].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eye1lX = lerp(eye1lX, e1X, 0.5);
    eye1lY = lerp(eye1lY, e1Y, 0.5);
    eye2lX = lerp(eye2lX, e2X, 0.5);
    eye2lY = lerp(eye2lY, e2Y, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eye1lX, eye1lY);

  fill(255, 0, 0);
  ellipse(noseX, noseY, d);
  fill(255,255,255);
  ellipse(eye1lX, eye1lY, 50);
  fill(255,255,255);
  ellipse(eye2lX, eye2lY, 50);
  fill(0,0,0);
  ellipse(eye1lX, eye1lY, 25);
  fill(0,0,0);
  ellipse(eye2lX, eye2lY, 25);
  fill(255,0,0);
  triangle();
  

}