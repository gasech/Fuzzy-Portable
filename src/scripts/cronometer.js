var mil,seg,min,hr;
mil = seg = min = hr = 0;
var contandoCronometro = false;
var tempo = document.getElementById("cronometer-time").innerHTML;

function startCronometer() {
	contandoCronometro = true;
}

function pauseCronometer() {
	contandoCronometro = false;
}

function resetCronometer(){
	pauseCronometer();
	mil = seg = min = hr = 0;

	document.getElementById("cronometer-seconds").innerHTML = "0" + seg;
	document.getElementById("cronometer-minutes").innerHTML = "0" + min;
	document.getElementById("cronometer-hours").innerHTML = "0" + hr;
}


setInterval(function contarCronometro(){
	if(contandoCronometro){	
		mil++;

		// Adiciona 0 aos numeros menores que 10 ou 100
		document.getElementById("cronometer-seconds").innerHTML = seg;
		document.getElementById("cronometer-minutes").innerHTML = min;
		document.getElementById("cronometer-hours").innerHTML = hr;

		if(seg < 10)
		{
			document.getElementById("cronometer-seconds").innerHTML = "0" + seg;
		}
		if(min < 10)
		{
			document.getElementById("cronometer-minutes").innerHTML = "0" + min;
		}
		if(hr < 10){
			document.getElementById("cronometer-hours").innerHTML = "0" + hr;
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
