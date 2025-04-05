
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

function vCallSelected(name, name2) {
    if(name2 === 'parent'){
        name2 = 'Lewis'
    }
    if(name2 === 'child'){
        name2 = 'Leslie'
    }
    if(name2 === 'grandparent'){
        name2 = 'Kwong-wing'
    }
    page = window.location.href
    window.location.href = `vCall Interface.html?name=${name}&name2=${name2}&page=${page}&time=0:00`;
}



