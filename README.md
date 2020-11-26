# 2019 HANIUM contest
## Team name: STEV.e (SolarTracking Mapping Robot)

__\<Member>__
  
- __Juil Koo__: Server-MCU-Client communication, GUI Programming, Automatically Mapping System
- __Heesoo Kim__: Machine design, ARM Coding(STM32F103RB - nucleo board), Solar Tracking part
https://github.com/zentornoe/Stev.e 
- __Daeuk Kim__: Citcuit, Action Camera, RF Communication part

<img src="https://user-images.githubusercontent.com/37788686/98651316-6fe38d00-237d-11eb-9f6d-66fb083ca32b.png" width="70%">
STEV.e is the robot exploring the areas, such as disaster areas that are hard for people to go. STEV.e has camera showing the current situation and RPLidar to map the surrounding terrain.

## Total Diagram
<img src="https://user-images.githubusercontent.com/37788686/98648169-41fc4980-2379-11eb-8152-e79cea0c368b.png" width="80%">

## My Diagram & Flow Chart
<img sr="https://user-images.githubusercontent.com/37788686/98650095-c51e9f00-237b-11eb-8f13-e33d13b22805.png">
<img src="https://user-images.githubusercontent.com/37788686/98650555-64dc2d00-237c-11eb-9429-f9334cc75284.png" width="80%">

1. __Raspberry Pi & ROS & RPLidar__: Mapping through Lidar operates on the ROS (Robot Operating System). Simulated Localization And Mapping (SLAM) is implemented through the Hector slam package among open sources of ROS. And Raspberry pie automatically starts mapping when booting. Automatically execute terminal at boot time from Ubuntu, the Raspberry Pi OS, and use the --command option to command the terminal ("roslaunch rplidar_ros view_slam".Launch") is automatically entered and the mapping executable is automatically executed.
<img src="https://user-images.githubusercontent.com/37788686/98651553-c3ee7180-237d-11eb-9d24-b9957cd6c450.png" width="100%">

2. __GUI Control Program__: The GUI control program is a program that allows users to remotely control the robot very intuitively. The GUI program is largely divided into two areas: server and client. For clients who cannot communicate directly with the MCU, the server acts as a stepping stone between the MCU and the client. The MCU and the server communicate through the serial port API of Node.js, and the server-client communication is through the socket.io API. Between the MCU and the client, the server not only sends and receives data, but also processes raw data into the appropriate necessary data. Client development is responsible for the graphical aspects that are directly visible to the user. First of all, it outputs an action cam video that it has received through RF communication on the screen. Also, based on various data received from the server, it graphically expresses the robot's current battery power, solar cell angle, and gimbal angle, and indicates that raspberry pie power can be switched on and off with toggle buttons. In addition, when the keyboard is pressed, it graphically expresses which key is pressed on the screen through event processing.
<img src="https://user-images.githubusercontent.com/37788686/98651856-22b3eb00-237e-11eb-8e58-61a8271df8c4.png" width="100%">

## Code Explanation
* server.js
```js
const ioHook = require('iohook');
ioHook.on('keydown', event => {
    var key = event.keycode;
    if (key == 17) {
        port.write('w');
    } else if (key == 30) {
        port.write('a');
    } else if (key == 31) {
        port.write('s');
    } else if (key == 32) {
        port.write('d');
    } else if (key == 36) {
        port.write('j');
    } else if (key == 37) {
        port.write('k');
    } else if (key == 45) {
        port.write('x');
    }
});
```
ioHook takes keydown event and send values corresponding to each key to MCU of STEV.e. So MCU receive the message and user can remotely control the STEV.e.
```js
io.on('connection', (socket) => {
    console.log('a user connected');
    parser.on('data', function (data) {
        var temp = myFunc.parseData(data);
        socket.emit('battery', temp.battery);
        socket.emit('solarTracker', temp.solarTracker);
        socket.emit('gimbal', temp.gimbal);
    });
    
    socket.on('rasp', (data) => {
        port.write(data);
    })
    socket.on('disconnect', (data) => {
        console.log('disconnect');
    })
});
```
socket.emit('key', value): socket sends the message to client. Server receives the current state of STEV.e(ex: battery, degree of gimbal...), 
and then sends this state to client. So user can see the current state of STEV.e in GUI.


* views/css/layout.css : CSS code to draw GUI web page.
* views/js/\*.js: These are front-end javascript codes. 
  + keyboard.js 
```js
window.onkeydown = function () {
     if (event.keyCode == 87) {
         key_w.src = "image/key_w_pressed.png";
     } else if (event.keyCode == 65) {
         key_a.src = "image/key_a_pressed.png";
     } else if (event.keyCode == 83) {
         key_s.src = "image/key_s_pressed.png";
     } else if (event.keyCode == 68) {
         key_d.src = "image/key_d_pressed.png";
     } else if (event.keyCode == 74) {
         key_j.src = "image/key_j_pressed.png";
     } else if (event.keyCode == 75) {
         key_k.src = "image/key_k_pressed.png";
     } else if (event.keyCode == 88) {
         key_x.src = "image/key_x_pressed.png";
     }
 }
 window.onkeyup = function () {
     if (event.keyCode == 87) {
         key_w.src = "image/key_w_unpressed.png";
     } else if (event.keyCode == 65) {
         key_a.src = "image/key_a_unpressed.png";
     } else if (event.keyCode == 83) {
         key_s.src = "image/key_s_unpressed.png";
     } else if (event.keyCode == 68) {
         key_d.src = "image/key_d_unpressed.png";
     } else if (event.keyCode == 74) {
         key_j.src = "image/key_j_unpressed.png";
     } else if (event.keyCode == 75) {
         key_k.src = "image/key_k_unpressed.png";
     } else if (event.keyCode == 88) {
         key_x.src = "image/key_x_unpressed.png";
     }
 }
```
onkeydown, onkeyup take key event. onkeydown draw pressed key image and onkeyup draw unpressed key image, so user can know which key is pressed.

  + webcam.js
```js
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
        }
```
This code streams webcam in web page.
