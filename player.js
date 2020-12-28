var maximo, medio, play, navbar, progres, mute, volume, bucle;

function start(){
    maximo = 400;
    medio = document.getElementById("media");
    play = document.getElementById("play");
    navbar = document.getElementById("navbar");
    progres = document.getElementById("progres");
    mute =  document.getElementById("mute");
    volume = document.getElementById("volumen");

    play.addEventListener("click", pushDown);
    mute.addEventListener("click", sound);
    navbar.addEventListener("click", move);
    volume.addEventListener("change", level);
}

function pushDown(){
    if(!medio.paused && !medio.ended){
        medio.pause();
        play.value = ">";
        clearInterval(bucle);
    }else{
        medio.play();
        play.value = "||";
        bucle = setInterval(estado, 1000);
    }
}

function estado(){
    if(!medio.ended){
        let long = parseInt(medio.currentTime * maximo/medio.duration);
        console.log(long);
        progres.style.width = long + 'px';
    }else{
        progres.style.width = '0px';
        play.value = ">";
        clearInterval(bucle);
    }
}

function move(event){
    if(!medio.paused && !medio.ended){
        let mouseX = event.offsetX - 2;
        if(mouseX < 0){
            mouseX = 0;
        }else if(mouseX > maximo){
            mouseX = maximo;
        }
        let time = mouseX * medio.duration / maximo;
        medio.currentTime = time;
        progres.style.width = mouseX + 'px';
    }
}

function sound(){
    if(mute.value == "Silence"){
        medio.muted = true;
        volume.value = 0;
        mute.value = "Sound";
    }else{
        medio.muted = false;
        volume.value = 60;
        mute.value = "Silence";
    }
}

function level(){
    medio.volume = volume.value;
}

window.addEventListener("load", start);