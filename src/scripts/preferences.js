function applyPreferences(){
    let backgroundUrl = document.getElementById('bgimg_url').value;
    let primaryColor = document.getElementById('prim_color').value;

    let preferences = {
        backgroundImage: backgroundUrl,
        primaryColor: primaryColor
    }
    
    setPreferences(preferences);
    
    document.getElementById("background").style.backgroundImage = `url(${preferences.backgroundImage})`;
    document.querySelector(':root').style.setProperty('--primaryColor', preferences.primaryColor);
}