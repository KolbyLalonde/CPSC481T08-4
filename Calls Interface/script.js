
function toggleMicrophone(){
    const slash = document.getElementById("slash");
    const txtMic = document.getElementById("txtMic");   
    slash.classList.toggle("hidden");
    txtMic.innerHTML = slash.classList.contains("hidden") ? "Microphone" : "Muted";
}

function decline(){
    window.history.back();
}