function showDate(){
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day = days[d.getDay()];
    var month = months[d.getMonth()];
    var dayM = d.getDate();
    
    var date = day + " " + dayM + " " + month + ", " + d.getFullYear();
    document.getElementById("MyDateDisplay").innerText = date;
    document.getElementById("MyDateDisplay").textContent = date;
    
    setTimeout(showTime, 1000);
    
}

showDate();