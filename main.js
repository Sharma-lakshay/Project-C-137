ob= document.getElementById("object").value;
video= "";
status= ""; 
objects= [];
function preload(){
    video= createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas= createCanvas(400, 200);
    canvas.center();
}

function start(){
 objectDetector= ml5.objectDetector("cocossd", modelLoaded);
 document.getElementById("number_of_objects").innerHTML= "Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model is intialized");
status= true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects= results;
    }
    }
    
    function draw(){
        image(video, 0, 0, 480, 380);
        if(status != ""){
            objectDetector.detect(video, gotResult);
            for(i=0; i < objects.length; i++){
                document.getElementById("number_of_objects").innerHTML= "Status: Objects Detected " + objects.length;
                fill('#FF0000');
                percent= floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke('#FF0000');
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                if(ob == objects[i].label){
                    document.getElementById("status").innerHTML= "Object Found";
                }
                else{
                    document.getElementById("status").innerHTML= "Object Not Found";
                }
    
            }
        }
    }