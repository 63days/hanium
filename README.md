# 2019 HANIUM contest
## Team name: STEV.e (SolarTracking Mapping Robot)
STEV.e is the robot exploring the areas, such as disaster areas that are hard for people to go. STEV.e has camera showing the current situation and RPLidar to map the surrounding terrain.

## Total Diagram
<img src="https://user-images.githubusercontent.com/37788686/98648169-41fc4980-2379-11eb-8152-e79cea0c368b.png" width="100%">

## My Diagram & Flow Chart
<img sr="https://user-images.githubusercontent.com/37788686/98650095-c51e9f00-237b-11eb-8f13-e33d13b22805.png">
<img src="https://user-images.githubusercontent.com/37788686/98650555-64dc2d00-237c-11eb-9429-f9334cc75284.png">

1. __Raspberry Pi & ROS & RPLidar__: Mapping through Lidar operates on the ROS (Robot Operating System). Simulated Localization And Mapping (SLAM) is implemented through the Hector slam package among open sources of ROS. And Raspberry pie automatically starts mapping when booting. Automatically execute terminal at boot time from Ubuntu, the Raspberry Pi OS, and use the --command option to command the terminal ("roslaunch rplidar_ros view_slam".Launch") is automatically entered and the mapping executable is automatically executed.

2. __GUI Control Program__: The GUI control program is a program that allows users to remotely control the robot very intuitively. The GUI program is largely divided into two areas: server and client. For clients who cannot communicate directly with the MCU, the server acts as a stepping stone between the MCU and the client. The MCU and the server communicate through the serial port API of Node.js, and the server-client communication is through the socket.io API. Between the MCU and the client, the server not only sends and receives data, but also processes raw data into the appropriate necessary data. Client development is responsible for the graphical aspects that are directly visible to the user. First of all, it outputs an action cam video that it has received through RF communication on the screen. Also, based on various data received from the server, it graphically expresses the robot's current battery power, solar cell angle, and gimbal angle, and indicates that raspberry pie power can be switched on and off with toggle buttons. In addition, when the keyboard is pressed, it graphically expresses which key is pressed on the screen through event processing.
