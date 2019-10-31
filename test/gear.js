var gear = document.getElementById('gear');
var select = document.getElementById('gearSelect');
var currentGear = 1;
gear.onclick = function() {
    if(currentGear == 5) {
        currentGear = 1;
    } else {
        currentGear += 1;
    }
    showGear(currentGear);
}
function showGear(curGear) {
    if(curGear == 1) {
        select.style.top = '90%';
    }else if(curGear == 2) {
        select.style.top = '67.5%';
    }else if(curGear == 3) {
        select.style.top = '45%';
    }else if(curGear == 4) {
        select.style.top = '22.5%';
    }else if(curGear == 5) {
        select.style.top = '0%';
    }
}
//1->90% 2->67.5  3->45 4->22.5 5->0%