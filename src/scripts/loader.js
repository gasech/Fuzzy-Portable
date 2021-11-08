var myVar;

function loadPage() {
  	myVar = setTimeout(showPage, 500);
}				

function showPage() {
  	document.getElementById("loader").style.display = "none";
  	document.getElementById("content").style.display = "block";
}