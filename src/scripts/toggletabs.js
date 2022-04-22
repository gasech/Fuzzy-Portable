function toggleTab(tab){
    let tabs = ["home","tasks","timers","settings"];
    let button = document.getElementById(tab + '-button');
    button.setAttribute("class", "buttonf nav-button active");

    let filteredTabs = tabs.filter(function(value){ 
        return value != tab;
    });

    document.getElementById(tab + "-section").style.display = "block";

    for(tabf of filteredTabs){
        button = document.getElementById(tabf + '-button');
        button.setAttribute("class", "buttonf nav-button");
        document.getElementById(tabf + "-section").style.display = "none";
    }
}