// pop

let popOverlay = document.getElementById('overlay');
let popWindow = document.getElementById('popWindow')
function showPop(){
    popOverlay.style.visibility = 'visible';
    popWindow.style.left = '50%'
    popWindow.style.top = '50%'
}
function closePop(){
    popOverlay.style.visibility = 'hidden';
    popWindow.style.left = '-800px'
    // popWindow.style.top = '-800px'
}