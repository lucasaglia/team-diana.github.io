# Our nodes for T0R0

## Rviz plugins
T0R0 gui is composed by rviz with a set of custom plugins

### Distance
Simple tool that let the user know the distance between the rover and a selected point in the pointcloud

Usage:
- Select the tool "Distance" from the tool bar
- Click on the point of interest

### Display Distance
A little space where distance from "Distance" tool is shown

Usage:
- Open the pannel from the pannel menu
- Use "Distance" tool as shown

## Joystick
Firmware to be flashed on Arduino

Usage:
- Download the T0R0DrivingTools repository
- Open the **joystick** project with the Arduino ide
- Compile and flash it on the Arduino shield connected to the joistick
- Run the **rosserial** node

## t0r0_driving_gui
A simple GUI for T0R0

Usage:
- Download the T0R0DrivingTools repository
- Copy the **t0r0_driving_gui** directory in your <catkin_workspace>/src
- Compile
- Run ```rosrun t0r0_driving_gui gui```

## t0r0_driving_core
The main node of the driving system

Usage:
- Download the t0r0_driving_core repository in your <catkin_workspace>/src
- Compile
- Run ```rosrun t0r0_driving_core core```
