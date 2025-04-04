
function toggleMicrophone(){
    const slash = document.getElementById("slash");
    const txtMic = document.getElementById("txtMic");   
    slash.classList.toggle("hidden");
    txtMic.innerHTML = slash.classList.contains("hidden") ? "Microphone" : "Muted";
}

function decline(){
    window.history.back();
}

function pCallSelected(name, role) {
    if(role === 'parent'){
        name2 = 'Lewis'
    }
    if(role === 'child'){
        name2 = 'Leslie'
    }
    if(role === 'grandparent'){
        name2 = 'Kwong-wing'
    }
    window.location.href = `pCall Interface 2ppl.html?name=${name}&name2=${name2}`;
  }
  


