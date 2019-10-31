var fill = document.getElementById("fill");
var batteryText = document.getElementById("batteryText");
const socket = io("http://localhost:6363");
var showBattery = function (remain) {
//    batteryText.value = data;
    batteryText.innerHTML = remain + '%';
    var length = remain * 1.7;
    var y = 172 - length
    fill.setAttribute('height', String(length));
    fill.setAttribute('y', String(y));
    if (remain < 15) {
        fill.style.fill = "#f44336";
    } else if (remain < 30) {
        fill.style.fill = "#ff9800";
    } else {
        fill.style.fill = "#4caf50";
    }
    if(remain == 100) {
        batteryText.innerHTML = 'Full';
    }
}


socket.on('battery', (remain) => {
    showBattery(remain);
    console.log('battery:', remain);
})

showBattery(0);

