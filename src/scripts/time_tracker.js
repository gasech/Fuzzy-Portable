var ttmil,ttseg,ttmin,tthr;
ttmil = ttseg = ttmin = tthr = 0;
var countingTracker = false;

function startTracker() {
	countingTracker = true;
}

function pauseTracker() {
	countingTracker = false;
}

function stopTracker(){
	pauseTracker();
	ttmil = ttseg = ttmin = tthr = 0;

	document.getElementById("tracker-seconds").innerHTML = "0" + ttseg;
	document.getElementById("tracker-minutes").innerHTML = "0" + ttmin;
	document.getElementById("tracker-hours").innerHTML = "0" + tthr;
}


setInterval(function countTracker(){
	if(countingTracker){	
		ttmil++;

		// Adiciona 0 aos numeros menores que 10 ou 100
		document.getElementById("tracker-seconds").innerHTML = ttseg;
		document.getElementById("tracker-minutes").innerHTML = ttmin;
		document.getElementById("tracker-hours").innerHTML = tthr;

		if(ttseg < 10)
		{
			document.getElementById("tracker-seconds").innerHTML = "0" + ttseg;
		}
		if(ttmin < 10)
		{
			document.getElementById("tracker-minutes").innerHTML = "0" + ttmin;
		}
		if(tthr < 10){
			document.getElementById("tracker-hours").innerHTML = "0" + tthr;
		}

		// Conta o tempo
		if(ttmil > 99)
		{
			ttmil=0;
			ttseg++;
		}
		if(tseg > 59) 
		{
			ttseg=0;
			ttmin++;
		}
		if(ttmin > 59)
		{
			ttmin=0;
			tthr++;
		}
	}
}, 10);
