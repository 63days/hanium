var batteryText = document.getElementById("batteryText");
var fill = document.getElementById("fill");
batteryText.value = 0;
batteryText.innerHTML = batteryText.value + '%';

batteryText.onclick = function () {
    batteryText.value += Math.round(Math.random() * 20);
    if (batteryText.value > 100) 
        batteryText.value = 0;
    batteryText.innerHTML = batteryText.value + '%';
    showBattery();
}

function showBattery() {
    var length = batteryText.value * 1.5;
    var y = 152 - length
    fill.setAttribute('height', String(length));
    fill.setAttribute('y', String(y));
    if(batteryText.value < 15){
        fill.style.fill = "#f44336";
    }else if(batteryText.value < 30) {
        fill.style.fill = "#ff9800";
    } else {
        fill.style.fill = "#4caf50";
    } 
}