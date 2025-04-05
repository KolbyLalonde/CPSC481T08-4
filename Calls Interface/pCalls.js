window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');  // e.g., 'K'
    const name2 = urlParams.get('name2');  // e.g., 'parent'

    document.getElementById('member1').innerHTML = name;
    document.getElementById('member2').innerHTML = name2;
  });
  