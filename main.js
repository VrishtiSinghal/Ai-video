video="";
Status="";
objects=[];
function preload(){
    video= createVideo('video.mp4');
    video.hide();    
}

function setup(){
    canvas= createCanvas(480,360);
    canvas.center();
}

function draw(){
    image(video,0,0,480,360);
    if(Status !=""){
        objectDetector.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+objects.length;
            document.getElementById("status").innerHTML="Status: Objects Detected";
            
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
            fill("red");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent+ "%", objects[i].x+15, objects[i].y+15);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status= true;
    video.loop();
    video.speed(1);
    video.volume(0);
}