var tmil = 99;
var tseg = 0;
var tmin = 5;

var alarmSound = true;
var audio = 1;

var contandoTemporizador = false;

function aumentarTemporizador(){
	if(contandoTemporizador == false){
		if(tmin >= 60){
			alert("Você não pode aumentar o temporarizador para mais que 60 minutos.");
		}else { 
			tmin += 5;
			document.getElementById("tMinutos").innerHTML = tmin; 
		}
	}
}

function diminuirTemporizador(){
	if(contandoTemporizador == false){
		if(tmin<6){
			alert("Você não pode diminuir o temporizador para menos que 5 minutos.");
		}else {
			if(tmin<11){ 
				tmin -= 5;
				document.getElementById("tMinutos").innerHTML = "0" + tmin;
			}else {
				tmin -= 5;
				document.getElementById("tMinutos").innerHTML = tmin;
			}
		}
	}
}

function resetarTemporizador(){
	contandoTemporizador = false;
	tseg = 0;
	tmin = 5;
	document.getElementById("tMinutos").innerHTML = "0" + tmin; 
	document.getElementById("tSegundos").innerHTML = "0" + tseg; 
}

function iniciarTemporizador(){
	contandoTemporizador = true;
}

function pausarTemporizador(){
	contandoTemporizador = false;
}

setInterval(function contarTemporizador(){
	if(contandoTemporizador){
		tmil--;

		document.getElementById("tSegundos").innerHTML = tseg;
		document.getElementById("tMinutos").innerHTML = tmin;

		if(tseg < 10)
		{
			document.getElementById("tSegundos").innerHTML = "0" + tseg;
		}
		if(tmin < 10)
		{
			document.getElementById("tMinutos").innerHTML = "0" + tmin;
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
			resetarTemporizador();
			tocarSom();
			alert("O tempo se esgotou!");	
		}
	}
}, 10);


function tocarSom(){
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