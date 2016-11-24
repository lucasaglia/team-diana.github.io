# Python Code Snippets

## Publisher, Subscriber, Service, Client

```python
#!/usr/bin/env python
import rospy
from std_msgs.msg import String
from beginner_tutorials.srv import *

def subscriber_callback(data):
    # executed when new data is published
    rospy.loginfo(rospy.get_caller_id()+"I heard %s",data.data)

def handle_multiply_two_floats(req):
    # executed when the servie is called.
    print "Returning [%s * %s = %s]"%(req.a, req.b, (req.a * req.b))
    return MultiplyTwoFloatsResponse(req.a * req.b)
    
if __name__ == '__main__':
    # init
    rospy.init_node('node_name', anonymous=True)
    # subscribe
    rospy.Subscriber("subscribe_topic", String, subscriber_callback)
    # create publisher
    pub = rospy.Publisher('publish_topic', String, queue_size=10)
    # publish
    pub.publish("string message")
    # wait for a service to be available
    rospy.wait_for_service('add_two_ints')
    # get a reference for the service 
    add_two_ints = rospy.ServiceProxy('add_two_ints', AddTwoInts)
    # call the service
    resp1 = add_two_ints(x, y)
    # create a service
    s = rospy.Service('multiply_two_floats', MultiplyTwoFloats, handle_multiply_two_floats)

    rospy.logdebug("log debug")
    rospy.loginfo("log info")
    rospy.logwarn("log warn")
    rospy.logerr("log err")
    rospy.logfatal("log fatal")


    # spin() simply keeps python from exiting until this node is stopped
    rospy.spin()
```
## Image Messages

```python
#!/usr/bin/env python
import sys
import rospy
import cv2
from sensor_msgs.msg import Image
from cv_bridge import CvBridge, CvBridgeError

from __future__ import print_function

class image_converter:
  def __init__(self):
    self.image_pub = rospy.Publisher("image_topic_2",Image)
    self.bridge = CvBridge()
    self.image_sub = rospy.Subscriber("image_topic",Image,self.callback)

  def callback(self,data):
  	# Convert from ros Image msg to OpenCV image
    try:
      cv_image = self.bridge.imgmsg_to_cv2(data, "bgr8")
    except CvBridgeError as e:
      print(e)

	# Convert from OpenCV imae to ros Image msg
    try:
      ros_image_msg = self.bridge.cv2_to_imgmsg(cv_image, "bgr8")	
      # remember to add stamp!
      ros_image_msg.header.stamp = data.header.stamp
      self.image_pub.publish(ros_image_msg)
    except CvBridgeError as e:
      print(e)

def main(args):
  ic = image_converter()
  rospy.init_node('image_converter', anonymous=True)
    rospy.spin()
```

### Compressed image message:

```python
from sensor_msgs.msg import CompressedImage

def callback(ros_data):
 	np_arr = np.fromstring(ros_data.data, np.uint8)
	image_cv = cv2.imdecode(np_arr, cv2.CV_LOAD_IMAGE_COLOR)     
```