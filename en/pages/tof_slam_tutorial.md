# ToF Slam tutorial

We will perform SLAM using the [sr4500](sr4500.md) sensor.

## Requirements

- Download a rosbag containing the ToF data.
- install [ccny_rgbd](ccny_rgbd.md)


## 1. Play the rosbag file

Start roscore

```bash
roscore
```

Since we are using recorded data, we need to sync with the time of the recorded data (see [rosbag](rosbag.md)

```bash
rosparam set /use_sim_time true
```

then play the file

```bash
rosbag play filename.bag --clock
```

## 2. Start the image proc

ToF data needs to be rectified, use the following launch file

*image_proc_swiss_ranger_all.launch*

```bash
<launch>
  <node name="swiss_ranger_image_proc_depth" pkg="image_proc" type="image_proc" output="screen" cwd="node" args="" ns="SwissRanger">
    <remap from="/SwissRanger/depth/camera_info" to="/SwissRanger/camera_info"/>
    <remap from="/SwissRanger/image_raw" to="/SwissRanger/depth/image_raw"/>
    <remap from="/SwissRanger/image_rect" to="/SwissRanger/depth/image_rect"/>
  </node>
  <node name="swiss_ranger_image_proc_intensity" pkg="image_proc" type="image_proc" output="screen" cwd="node" args="" ns="SwissRanger">
    <remap from="/SwissRanger/intensity/camera_info" to="/SwissRanger/camera_info"/>
    <remap from="/SwissRanger/image_raw" to="/SwissRanger/intensity/image_raw"/>
    <remap from="/SwissRanger/image_rect" to="/SwissRanger/intensity/image_rect"/>
  </node>
</launch> 
```

```bash
roslaunch image_proc_swiss_ranger_all.launch
```

Compare the rectified and raw image:

```bash
rosrun image_view image_view image:=/SwissRanger/intensity/image_raw &
rosrun image_view image_view image:=/SwissRanger/intensity/image_rect 
```

Notice how *image_rect* does not present any barrel effect.

## 3. Setup the transform tree.

The rover moves, but also its part moves too (think about the pantilt) 

So we need to tell all the process in ROS how the robot parts positions and rotations (transforms). See also [tf](tf.md) 

We will write a simple python script that will publish the required tf for us. These tf are made up and entirely static (fixed).

save this file in static_tf_pub.py:

```python
#!/usr/bin/env python2
from __future__ import print_function
import rospy
import tf
import time
import signal
import numpy as np
from sensor_msgs.msg import JointState
from time import sleep

JOINT_STATE_TOPIC='/rover_amalia/joint_states'

broadcasters = map(tf.TransformBroadcaster, range(0,3))

def publish_tf():
    vec3_zero = (0, 0, 0)
    quat_zero = tf.transformations.quaternion_from_euler(0, 0, 0)
    broadcasters[0].sendTransform(
                    vec3_zero,
                    quat_zero,
                    rospy.Time.now(),
                    "odom",
                    "map")
    broadcasters[1].sendTransform(
                    vec3_zero,
                    quat_zero,
                    rospy.Time.now(),
                    "base_link",
                    "odom")
    broadcasters[2].sendTransform(
                    vec3_zero,
                    tf.transformations.quaternion_from_euler(np.pi/2, np.pi, np.pi/2),
                    rospy.Time.now(),
                    "SwissRanger",
                    "base_link")

RUN = True 

def stop(signal, frame):
    global RUN
    RUN = False

if __name__ == "__main__":
    rospy.init_node("urdf_static")
    signal.signal(signal.SIGINT, stop)
    while RUN:
        print("publishing")
        publish_tf()
        sleep(0.1)
```

then run it with

```bash
python2 static_tf_pub.py
```

Now check that the tf **tree** is correct. Generate a pdf file using:

```bash
rosrun tf view_frames
```

Check out the new *frames.pdf*, it should appear like this:

![](/uploads/exampletf2.png)

If it is ok proceed to the next step.

## 4. Run ccny_rgbd

