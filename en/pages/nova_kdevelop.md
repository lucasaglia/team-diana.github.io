# Kdevelop - Nova

## Setup KDevelop for working on a nova project

After having generated the project CMakeLists.txt with the command

```bash
CoreWorkspace.py generate
```

You can open the CMakeLists.txt with KDevelop. The following steps must 
be followed in order to setup the project

### Setup ENV variables

You need to set the right environment variable in KDevelop. 

Go to Settings -> Configure KDevelop -> Environmet and click on the Batch Edit Mode button

You need to insert the NOVA workspace variables. They can be printed using:

```bash
# change NOVA_WS_DIR accordingly to your workspace directory
source NOVA_WS_DIR/setup.sh
export | grep -i nova
```

Copy these values inside kdevelop:

![Nova Kdev ENV](/uploads/nova_kdevelop_env.png)

Remember to give a name to this configuration! so that you can use it later. For instance, call it **nova**

## Open the CMakeFiles.txt project

Go to Open/Import Project, set the directory containing the CMakeLists.txt file (e.g. ./src/targets/PROJECT_NAME)

After having opened the project, change the environement to **nova**:

![Nova Kdev ENV2](/uploads/nova_kdevelop_env2.png)

Some additionals variables need to be defined. Open once again the Batch Edit Mode and insert these variables:

NOTE: you need to change all these variables according to your settings! this is just an example. You can inspect the cmake cache (with cmakegui for instance) if you want to get this values quickly

```bash
STM32_CHIP=STM32F303CB
CMAKE_TOOLCHAIN_FILE=/home/clynamen/teamdiana/nova/core/core-cmake/gcc_stm32.cmake
CMAKE_BUILD_TYPE=release
TOOLCHAIN_PREFIX=/home/clynamen/teamdiana/nova/core/gcc-arm-none-eabi
CMAKE_MODULE_PATH=/home/clynamen/teamdiana/nova/core/core-cmake
CHIBIOS_ROOT=/home/clynamen/teamdiana/nova/core/chibios_3
NOVA_ROOT=/home/clynamen/teamdiana/nova/core
NOVA_WORKSPACE_ROOT=/home/clynamen/teamdiana/nova/nova_ping
```

Then compile. Both .elf and .bin will be generated.
