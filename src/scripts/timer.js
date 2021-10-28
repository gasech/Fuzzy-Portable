var tmil = 99;
var tseg = 0;
var tmin = 5;

var alarmSound = true;
var audio = 1;

var contandoTemporizador = false;

function increaseTimer(){
	if(contandoTemporizador == false){
		if(tmin >= 60){
			alert("You cannot increase the timer to more than 60 minutes.");
		}else { 
			tmin += 5;
			document.getElementById("timer-minutes").innerHTML = tmin; 
		}
	}
}

function decreaseTimer(){
	if(contandoTemporizador == false){
		if(tmin<6){
			alert("You cannot decrease the timer to less than 5 minutes.");
		}else {
			if(tmin<11){ 
				tmin -= 5;
				document.getElementById("timer-minutes").innerHTML = "0" + tmin;
			}else {
				tmin -= 5;
				document.getElementById("timer-minutes").innerHTML = tmin;
			}
		}
	}
}

function resetTimer(){
	contandoTemporizador = false;
	tseg = 0;
	tmin = 5;
	document.getElementById("timer-minutes").innerHTML = "0" + tmin; 
	document.getElementById("timer-seconds").innerHTML = "0" + tseg; 
}

function startTimer(){
	contandoTemporizador = true;
}

function pauseTimer(){
	contandoTemporizador = false;
}

setInterval(function contarTemporizador(){
	if(contandoTemporizador){
		tmil--;

		document.getElementById("timer-seconds").innerHTML = tseg;
		document.getElementById("timer-minutes").innerHTML = tmin;

		if(tseg < 10)
		{
			document.getElementById("timer-seconds").innerHTML = "0" + tseg;
		}
		if(tmin < 10)
		{
			document.getElementById("timer-minutes").innerHTML = "0" + tmin;
		}

		if(tmil < 0)
		{
			tmil=99;
			tseg--;
		}
		if(tseg < 0) 
		{
			tseg=59;
			tmin--;
		}

		if(tmin < 0){
			playSound();
			tocarSom();
			alert("Time is up!");	
		}
	}
}, 10);


function playSound(){
	if(alarmSound){
		let x = document.getElementById("quietKnock"); 

		switch(audio){
			case 1:
				x.play();
				break;
			default:
		}
	}
}

function toggleSound(){ 
	alarmSound = !alarmSound;
} 