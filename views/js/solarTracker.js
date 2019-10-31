var solar = document.getElementById("degreeS");
socket.on('solarTracker', (data) => {
    switch(data) {
        case 1:
            solar.src = "image/dash1.png";
            break;
        case 2:
            solar.src = "image/dash2.png";
            break;
        case 3:
            solar.src = "image/dash3.png";
            break;
        case 4:
            solar.src = "image/dash4.png";
            break;
        case 5:
            solar.src = "image/dash5.png";
            break;
        case 6:
            solar.src = "image/dash6.png";
            break;
        case 7:
            solar.src = "image/dash7.png";
            break;
        case 8:
            solar.src = "image/dash8.png";
            break;
        case 9:
            solar.src = "image/dash9.png";
            break;
        default:
            solar.src = "image/dashLoading.png";
            break;
    }
})