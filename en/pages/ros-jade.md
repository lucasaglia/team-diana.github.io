# ROS SYSTEM

## Core

[Installation instructions](http://wiki.ros.org/jade/Installation/UbuntuARM)

## Nodes

### Cv_camera
Read data from camera or file

#### Install:
```bash
sudo apt-get install ros-jade-cv-camera
```
#### Run:
- Run the command:
```bash
rosrun cv_camera cv_camera_node
```
- Use a launch file
```bash
roslaunch <file_name.launch>
```
Example of launch file:
```xml
<launch>
        <node pkg="cv_camera" type="cv_camera_node" name="camera_input">
                <param name="device_id" value="0"/>
        </node>
</launch>
```

## Tools

### Rostopic
Tool for topics management

#### Install:
```bash
sudo apt-get install ros-jade-rostopic
```
#### List all running topics:
Run the command:
```bash
rostopic list
```
