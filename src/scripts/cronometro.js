var mil,seg,min,hr;
mil = seg = min = hr = 0;
var contandoCronometro = false;
var tempo = document.getElementById("cTempo").innerHTML;

function iniciarCronometro() {
	contandoCronometro = true;
}

function pausarCronometro() {
	contandoCronometro = false;
}

function zerarCronometro(){
	contandoCronometro = false;	
	mil=0;
	seg=0;
	min=0;
	hr=0;

	document.getElementById("cSegundos").innerHTML = "0" + seg;
	document.getElementById("cMinutos").innerHTML = "0" + min;
	document.getElementById("cHoras").innerHTML = "0" + hr;
}


setInterval(function contarCronometro(){
	if(contandoCronometro){	
		mil++;

		// Adiciona 0 aos numeros menores que 10 ou 100
		document.getElementById("cSegundos").innerHTML = seg;
		document.getElementById("cMinutos").innerHTML = min;
		document.getElementById("cHoras").innerHTML = hr;

		if(seg < 10)
		{
			document.getElementById("cSegundos").innerHTML = "0" + seg;
		}
		if(min < 10)
		{
			document.getElementById("cMinutos").innerHTML = "0" + min;
		}
		if(hr < 10){
			document.getElementById("cHoras").innerHTML = "0" + hr;
		}

		// Conta o tempo
		if(mil > 99)
		{
			mil=0;
			seg++;
		}
		if(seg > 59) 
		{
			seg=0;
			min++;
		}
		if(min > 59)
		{
			min=0;
			hr++;
		}
	}
}, 10);
