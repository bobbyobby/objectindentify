img = "";
status = "";
object = [];
function preload(){
    img = loadImage('dog_cat.jpg');
}
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status: detecting objects";

}
function modelLoaded(){
    console.log("model loaded");
    status = true;
    
}
function gotResult(error,results){
    if (error){
        console.error(error);

    }
  console.log(results);  
  object = results;
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video,gotResult);
        for(i = 0; i < object.length;i++){
        document.getElementById("status").innerHTML = "Status:Objects Detected";
        document.getElementById("num_objects").innerHTML = "Number of Objects Detected are: "+ object.length;
    fill(r,g,b);
    percent = floor(object[i].confidence*100);
    text(object[i].label + " " + percent + "%", object[i].x,object[i].y);
    stroke(r,g,b);
    noFill();
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    
    }
    
}