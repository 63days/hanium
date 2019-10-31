var gimbal = document.getElementById("degreeG");
socket.on('gimbal', (data) => {
    switch(data) {
        case 1:
            gimbal.src = "image/dash1.png";
            break;
        case 2:
            gimbal.src = "image/dash2.png";
            break;
        case 3:
            gimbal.src = "image/dash3.png";
            break;
        case 4:
            gimbal.src = "image/dash4.png";
            break;
        case 5:
            gimbal.src = "image/dash5.png";
            break;
        case 6:
            gimbal.src = "image/dash6.png";
            break;
        case 7:
            gimbal.src = "image/dash7.png";
            break;
        case 8:
            gimbal.src = "image/dash8.png";
            break;
        case 9:
            gimbal.src = "image/dash9.png";
            break;
        default:
            gimbal.src = "image/dashLoading.png";
            break;
    }
})