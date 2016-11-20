# Nova Core Tools

*(Some documentation is already available [here](http://docs.novalabs.io/core/index.html). This document is not intended to replace it, but only provide some additional information gathered from direct experience. Not all of this information is relevant for who wants to just use the tools, but it's useful to gain additional insights about how the tools work  if the documentation is unclear or if anything goes wrong.)*

## Overview

The Nova Core Tools is a collection of tools provided by Nova Labs whose purpose is to organize the directory structure of source code, and to automate the build process of projects for the Nova platform.

To this end, it defines a few concepts:

- a **package** is, in essence, a library. (There is no OS nor dynamic linker on an embedded system such as the Nova boards, so static linking only!);

- a **module** is any one of the boards offered by Nova (e.g. IMU, USB, Stepper motor controller, ...), and the corresponding supporting source code;

- a **target** is an executable program destined for execution on a particular *module*;

- a **workspace** is a collection of *packages* and *targets* compiled together.


## Include paths

It's important to keep in mind that packages and modules all have:

- a *provider*: the organization that publishes the package;

- a *name*: unique among all packages contained in the workspace (even if they're from different providers);

The provider and name determine the **include path** by which every header file contained in the package is reachable, which is of the form `<PROVIDER/PACKAGE/FILENAME.hpp>`.

This is not evident by the directory structure of a package. For example, here's a workspace called `ping_ws`, containing the package `ping` and two targets called `replier` and `requester`, all of them with provider `team_diana`. The directory structure may look like this:

```
ping_ws
├── setup.sh
├── src
│   ├── packages
│   │   ├── ping
│   │   │   ├── CORE_PACKAGE.json
│   │   │   ├── include
│   │   │   │   ├── Node.hpp
│   │   │   ├── LICENSE
│   │   │   └── src
│   │   │       ├── Node.cpp
│   │   └── ping_mags
│   │       ├── CORE_PACKAGE.json
│   │       └── messages
│   │           ├── Reply.json
│   │           ├── Request.json
│   └── targets
│       ├── replier
│       │   ├── CMakeLists.txt
│       │   ├── main.cpp
│       │   ├── MODULE_TARGET.json
│       │   ├── replier-Debug.launch
│       │   └── replier-Release.launch
│       └── requester
│           ├── CMakeLists.txt
│           ├── main.cpp
│           ├── MODULE_TARGET.json
│           ├── requester-Debug.launch
│           └── requester-Release.launch
├── WORKSPACE.json
```

Target `replier` uses packages `ping` and `ping_msgs` (so they're
listed in `replier`'s `MODULE_TARGET.json` under `required_packages`). 

In the target's source code (`src/targets/replier/main.cpp`) and in the package's source code (`src/packages/ping/src/Node.cpp`) it's necessary to include the relevant header files. The correct way to write the `#include` directives is the following:

```
#include <team_diana/ping/Node.hpp>
#include <team_diana/ping_msgs/Request.hpp>
#include <team_diana/ping_msgs/Reply.hpp>
```

Note that the `team_diana` directory doesn't seem to exist anywhere in the above listed directory structure. This is because the `PROVIDER/PACKAGE/FILENAME` convention is *enforced* by the command `CoreWorkspace.pt generate`. During this command's execution:

- source code for serialization/deserialization of messages is generated and placed under `generated/`;

- the `PROVIDER/PACKAGE/FILENAME` directory structure is created under the `generated/` directory, by symlinking all the needed source code files from `src/`.

After running the command, the `generated/` directory looks roughly like the following (we're compiling on the `stepper` module for this example):

```
generated/
├── modules
│   └── stepper
│       └── ...
└── packages
    ├── common_msgs
    │   ├── common_msgsConfig.cmake
    │   └── include
    │       └── core
    │           └── common_msgs
    │               ├── Float32.hpp
    │               ├── Led.hpp
    │               └── ...
    ├── ...
    ├── led
    │   ├── include
    │   │   └── core
    │   │       └── led
    │   │           ├── ...
    │   │           ├── SubscriberConfiguration.hpp
    │   │           └── Subscriber.hpp
    │   ├── ledConfig.cmake
    │   └── src
    │       └── ...
    ├── ping
    │   ├── include
    │   │   └── team_diana
    │   │       └── ping
    │   │           └── Node.hpp -> ../src/packages/ping/include/Node.hpp
    │   ├── pingConfig.cmake
    │   └── src
    │       └── Node.cpp -> /mnt/lxc/nova/ping_ws/src/packages/ping/src/Node.cpp
    └── ping_msgs
        ├── include
        │   └── team_diana
        │       └── ping_msgs
        │           ├── Reply.hpp
        │           └── Request.hpp
        └── ...
```

Note that, for each package, a new include directory is added to the compiler flags (e.g. for `ping_msgs`, `generated/ping_msgs/include`), and this makes the above include directive valid (because a directory with the provider's name `team_diana` now exists).
