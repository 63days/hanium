var templateHTML = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Display Webcam Stream</title>

    <style>
        #title {
            margin: 0;
            padding: 0;
            position: absolute;
            top: 15px;   
            left: 20px;
            text-transform: uppercase;
            font-size: 2.6rem;
            font-weight: 500;
        }

        body {
            background-color: #2c3e50;
        }

        #container {
            margin: 0px auto;
            width: 540px;
            height: 360px;
            border: 2px #3498db solid;
            border-radius: 25px;
            position: absolute;
            top: 100px;
        }

        #videoElement {
            width: 540px;
            height: 360px;
            background-color: #191919;
            border-radius: 25px;
            position: absolute;
        }

        #keyMain {
            position: absolute;
            width: 540px;
            height: 350px;
            top: 110px;
            left: 670px;
            border: 2px black solid;
        }

        #keyMainText {
            font-size: 30px;
            text-align: center;
            text-transform: uppercase;
        }

        #key_w {
            position: absolute;
            top: 216px;
            left: 65px;
        }

        #key_a {
            position: absolute;
            top: 275px;
            left: 7px;
        }

        #key_s {
            position: absolute;
            top: 275px;
            left: 65px;

        }

        #key_d {
            position: absolute;
            top: 275px;
            left: 123px;
        }

        #key_j {
            position: absolute;
            top: 275px;
            left: 210px;
        }

        #key_k {
            position: absolute;
            top: 275px;
            left: 268px;
        }

        #batteryText {
            position: absolute;
            top: 390px;
            left: 585px;
            font-size: 14px;
            width: 30px;
            height: 20px;
            border: 2px white 2px;
            text-align: center;
            color: white;
        }

        #batterymain {
            position: absolute;
            top: 310px;
            left: 580px;
        }

        #gear {
            position: absolute;
            height: 150px;
            width: 40px;
            border: 2px #3498db solid;
            border-radius: 7px;
            top: 180px;
            left: 470px;
            background-color: black;
        }

        #gearSelect {
            position: absolute;
            width: 100%;
            height: 10%;
            top: 90%;
            background-color: aquamarine;
            border-radius: 7px;
        }

        #gearText {
            position: absolute;
            top: 150px;
            left: 473px;
        }
        #instruction {
            text-align: center;
        }
    </style>
</head>

<body>
    <h1 id="title" style="color: whitesmoke">Exploration Robot</h1>
    <div id="container">
        <video autoplay="true" id="videoElement"></video>
    </div>
    <script>
var video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                    video: true
                })
                .then(function(stream) {
                    video.srcObject = stream;
                })
                .catch(function(err0r) {
                    console.log("Something went wrong!");
                });
        }</script>
    <div id="keyMain">
        <div id="keyMainText">Robot Control</div>
        <span id="gearText">GEAR</span>
        <img id="key_w" width=60px height=60px src="test/image/key_w_unpressed.png">
        <img id="key_a" width=60px height=60px src="test/image/key_a_unpressed.png">
        <img id="key_s" width=60px height=60px src="test/image/key_s_unpressed.png">
        <img id="key_d" width=60px height=60px src="test/image/key_d_unpressed.png">
        <img id="key_j" width=60px height=60px src="test/image/key_j_unpressed.png">
        <img id="key_k" width=60px height=60px src="test/image/key_k_unpressed.png">
        <div id="gear">
            <div id="gearSelect"></div>
        </div>
        <p id="instruction">
            &lt;조작법&gt;<br>
            <strong>W</strong>: 전진 
            <strong>S</strong>: 정지 <br>
            <strong>A</strong>: 바퀴 좌회전 
            <strong>D</strong>: 바퀴 우회전<br>
            <strong>J</strong>: 카메라 좌회전 
            <strong>K</strong>: 카메라 우회전<br>
            <strong>GEAR</strong> 클릭시 속도 조절 가능
        </p>
    </div>



    <svg id="batterymain" width="60" height="180">
        <rect id="outbattery" x="2" y="2" rx="5" ry="5" width="30" height="150" stroke="#3498db" stroke-width="2" />
        <rect id="fill" x="2" y="2" rx="5" ry="5" width="30" height="0" style="fill:#4CAF50;" />
    </svg>

    <div id="batteryText"></div>
    <script>
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
}</script>
    <script>
function getKey(key) {
    return document.getElementById('key_'+key);
}
var key_w = getKey('w'),
    key_a = getKey('a'),
    key_s = getKey('s'),
    key_d = getKey('d'),
    key_j = getKey('j'),
    key_k = getKey('k');


window.onkeydown = function () {
    if (event.keyCode == 87) {
        key_w.src = "test/image/key_w_pressed.png";
    } else if (event.keyCode == 65) {
        key_a.src = "test/image/key_a_pressed.png";
    } else if (event.keyCode == 83) {
        key_s.src = "test/image/key_s_pressed.png";
    } else if (event.keyCode == 68) {
        key_d.src = "test/image/key_d_pressed.png";
    } else if (event.keyCode == 74){
        key_j.src = "test/image/key_j_pressed.png";
    } else if (event.keyCode == 75) {
        key_k.src = "test/image/key_k_pressed.png";
    }
}
window.onkeyup = function () {
    if (event.keyCode == 87) {
        key_w.src = "test/image/key_w_unpressed.png";
    } else if (event.keyCode == 65) {
        key_a.src = "test/image/key_a_unpressed.png";
    } else if (event.keyCode == 83) {
        key_s.src = "test/image/key_s_unpressed.png";
    } else if (event.keyCode == 68) {
        key_d.src = "test/image/key_d_unpressed.png";
    } else if (event.keyCode == 74){
        key_j.src = "test/image/key_j_unpressed.png";
    } else if (event.keyCode == 75) {
        key_k.src = "test/image/key_k_unpressed.png";
    }
}
</script>
    <script>
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
//1->90% 2->67.5  3->45 4->22.5 5->0%</script>
</body></html>
`;

module.exports.templateHTML = templateHTML;