# C++ Code Snippets

## Publisher and Subscriber

```c++
#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>

void chatterCallback(const std_msgs::String::ConstPtr& msg)
{
    ROS_INFO("I heard: [%s]", msg->data.c_str());
}

int main(int argc, char** argv) {
  ros::init(argc, argv, "talker");
  ros::NodeHandle n;

  // Create publisher
  ros::Publisher chatter_pub = n.advertise<std_msgs::String>("chatter", 1000);

  // publish
  std::stringstream ss;
  ss << "hello world " << count;
  msg.data = ss.str();
  chatter_pub.publish(msg);

  // Create subscriber
  ros::Subscriber sub = n.subscribe("chatter", 1000, chatterCallback);  

  // for member methods:
  //ros::Subscriber sub = n.subscribe("chatter", 1000, &Class::chatterCallback, this);  

  // spin, run until exit
  ros::spin();
}
```

## Service

```c++

#include "ros/ros.h"
#include "beginner_tutorials/AddTwoInts.h" // package_name/service_name.h

bool add(beginner_tutorials::AddTwoInts::Request  &req,
         beginner_tutorials::AddTwoInts::Response &res) // must return bool
{
  res.sum = req.a + req.b;
  return true;
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "add_two_ints_server");
  ros::NodeHandle n;

  // Service
  ros::ServiceServer service = n.advertiseService("add_two_ints", add);
  // or, for member methods:
  // ros::ServiceServer service = n.advertiseService("add_two_ints", &Class::callbackMethod, this);
  ROS_INFO("Ready to add two ints.");

  // Client
  ros::ServiceClient client = n.serviceClient<beginner_tutorials::AddTwoInts>("add_two_ints");
  beginner_tutorials::AddTwoInts srv;
  srv.request.a = 2;
  srv.request.b = 2;
  if (client.call(srv))
  {
    ROS_INFO("Sum: %ld", (long int)srv.response.sum);
  }

  ros::spin();
}
```

## ros params

```c++
ros::NodeHandle nh;

nh.hasParam("/global_name")

nh.getParam("/global_name", value_by_ref)
nh.getParam("relative_name", value_by_ref)
nh.getParam("~private_name", value_by_ref)

nh.param("param_name, value_by_ref, default_value);
nh.param<std::string>("param_name, value_by_ref, default_value);

nh.setParam("bool_param", false);
nh.setParam("relative_param", "my_string");

nh.deleteParam("my_param");

#get a list
std::vector<double> my_double_list;
nh.getParam("my_double_list", my_double_list);
```

## TF2

*listen to transform*

```c++

#include <ros/ros.h>
#include <tf2_ros/transform_listener.h>

int main(int argc, char** argv){
  ros::init(argc, argv, "my_tf2_listener");
  ros::NodeHandle node;

  tf2_ros::Buffer tfBuffer;
  tf2_ros::TransformListener tfListener(tfBuffer);

  ros::Rate rate(10.0);
  while (node.ok()){
    geometry_msgs::TransformStamped transformStamped;
    try{
      transformStamped = tfBuffer.lookupTransform("turtle2", "turtle1",
                               ros::Time(0)); // time=0 => last available transform
    }
    catch (tf2::TransformException &ex) {
      ROS_WARN("%s",ex.what());
      ros::Duration(1.0).sleep();
      continue;
    }
    rate.sleep();
  }
  return 0;
};

```

*publish transform*

```c++

#include <ros/ros.h>
#include <tf2_ros/transform_broadcaster.h>
#include <tf2/LinearMath/Quaternion.h>

int main(int argc, char** argv){
  ros::init(argc, argv, "my_tf2_broadcaster");
  ros::NodeHandle node;

   tf2_ros::TransformBroadcaster tfb;
  geometry_msgs::TransformStamped transformStamped;

  transformStamped.header.stamp = ros::Time::now();
  transformStamped.header.frame_id = "map";
  transformStamped.child_frame_id = "robot";
  transformStamped.transform.translation.x = 0.0;
  transformStamped.transform.translation.y = 2.0;
  transformStamped.transform.translation.z = 0.0;
  tf2::Quaternion q;
  q.setRPY(0, 0, 0);
  transformStamped.transform.rotation.x = q.x();
  transformStamped.transform.rotation.y = q.y();
  transformStamped.transform.rotation.z = q.z();
  transformStamped.transform.rotation.w = q.w();

  ros::Rate rate(10.0);
  while (node.ok()){
    tfb.sendTransform(transformStamped);
    rate.sleep();
    printf("sending\n");
  }

};
```

*CMakeLists.txt"

```cmake

find_package(catkin REQUIRED COMPONENTS  ...  tf2_ros ...)


catkin_package(
  ...
  CATKIN_DEPENDS ... tf2_ros ...
  ...
)


```
*package.xml*
```xml
...
<depend>tf2_ros</depend>
...
```
