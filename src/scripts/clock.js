function showTime(){
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";
    let greetingsText = document.getElementById("greetings");
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }    

    if(session == "AM"){
        greetingsText.innerHTML = "Good Morning";
    } else if(session == "PM" && h < 6) {
        greetingsText.innerHTML = "Good afternoon";
    } else {
        greetingsText.innerHTML = "Good night";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    let time = h + ":" + m + ":" + s + "     " + session;
    document.getElementById("clock-display").innerText = time;
    document.getElementById("clock-display").textContent = time;

    setTimeout(showTime, 1000);
}

showTime();