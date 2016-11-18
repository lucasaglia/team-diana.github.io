# Catkin Snippets

## Create a new package

```bash
catkin_create_pkg beginner_tutorials std_msgs rospy roscpp
```

## Generic Catkin CMakeLists.txt

```cmake
cmake_minimum_required(VERSION 2.8.7)

project(my_project_name)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11")

find_package(catkin REQUIRED COMPONENTS catkin_lib_1 catkin_lib_2)

catkin_package(
    INCLUDE_DIRS include # if include/ files are exported
    LIBRARIES ${PROJECT_NAME} # if a library is exported
    CATKIN_DEPENDS catkin_lib_1 catkin_lib_2 # only runtime dependencies
    DEPENDS ext_lib_1 # other non catkin dependencies
)

include_directories(
    include
    ${catkin_INCLUDE_DIRS} # include files from other catkin packages
)

add_library(${PROJECT_NAME} # for adding a library
    src/src1.cpp
    src/src2.cpp
)

add_executable(${PROJECT_NAME} # for adding an executable (e.g. rosnode)
    src/src1.cpp
    src/src2.cpp
)

target_link_libraries(${PROJECT_NAME}
    ${catkin_LIBRARIES} # link other catkin packages libraries
)

# generic install command, that install libraries and executables
install(TARGETS ${PROJECT_NAME}
    ARCHIVE DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
    LIBRARY DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
    RUNTIME DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

# install command that will install include files that must be exported
# this must be done if we are creating a library!
install(DIRECTORY include/${PROJECT_NAME}/
    DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
    FILES_MATCHING PATTERN "*.hpp"
)

```

## Message

_package.xml_

```xml
  ...
  <build_depend>message_generation</build_depend>
  <run_depend>message_runtime</run_depend>
  ...
```

_CMakeLists.txt_

```cmake

find_package(catkin REQUIRED COMPONENTS
   ...
   message_generation
   ...
)

add_message_files(
  FILES
  Message1.msg
  Message2.msg
)

generate_messages(
  DEPENDENCIES
  std_msgs
)

catkin_package(
  ...
  CATKIN_DEPENDS message_runtime ...
  ...
)

add_dependencies(PROJECT_NAME PROJECT_NAME_msgs_generate_messages_cpp)


```

## Service 

After having written a service file such as:

* MyService.srv *
```bash
string str
---
bool result
```

add these lines to the  CMakeLists.txt 

```cmake
# pay attention to the order

find_package(catkin REQUIRED COMPONENTS
   ...
   message_generation
   ...
)

add_service_files(FILES MyService.srv)

generate_messages() 

catkin_package(
	...
	CATKIN_DEPENDS message_runtime
	...
)
```

### package.xml

In package.xml there must be: 

```xml
## for format 1
<build_dependency>message_generation</build_dependency>
<runtime_dependency>message_runtime</runtime_dependency>

## or, for format 2
<build_depend>foo</build_depend>
<exec_depend>foo</exec_depend>
```


## package.xml

example package.xml file:

[format 2](http://docs.ros.org/kinetic/api/catkin/html/howto/format2/catkin_overview.html)

```xml
<package format="2">
  <name>your_package</name>
  <version>1.2.4</version>
  <description>
    This package adds extra features to rosawesome.
  </description>
  <maintainer email="you@example.com">Your Name</maintainer>
  <license>BSD</license>
  <buildtool_depend>catkin</buildtool_depend>
</package>
```
