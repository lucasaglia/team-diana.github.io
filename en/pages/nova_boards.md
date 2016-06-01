# Nova Boards

## How to program

### Requirements:

- Linux (preferably ubuntu, but others are fine too)
- Eclipse (preferably CDT version, downloadable [here](http://www.eclipse.org/downloads/packages/eclipse-ide-cc-developers/mars2) )
- **GNU ARM Eclipse** tools, downloadable from **Eclipse marketplace**
* Python and some python packages
* Texane STlink tool
* Other tools (cmake)


#### Python packages installation

```bash
# commands for ubuntu
sudo apt-get install python-pip 
sudo pip install argcomplete gitpython colorama avro tabulate
```

****  Texane STlink tool

```bash
sudo apt-get install git libusb-1.0-0 libusb-1.0-0-dev cmake
git clone https://github.com/texane/stlink.git
cd stlink
mkdir build
cd build
cmake ..
make
sudo make install
cd ..
sudo cp etc/udev/rules.d/* /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger
```


#### other packages installation

```bash
# commands for ubuntu
sudo apt-get install cmake
```


### Setup Nova tools 

First, it is necessary to setup nova tools. These tools allow to create a new workspace, add/remove packages, configure the board and eventually write your firmware.
Read the [docs for more details](http://docs.novalabs.io)

A pre-created, ready to use, compressed directory was created in order to speed up the setup process. Follow [Setup Nova tools - A](#Setup_Nova_tools_A) in order to use the compressed 
directory, otherwise follow [Setup Nova Tools - B](#Setup_Nova_tools_B)

It is also possible to use the [prebuilt virtualbox image](nova_vbox_image.md). If you use the virtualbox image skip to [Create a new workspace](#Create_a_new_workspace)


### Setup Nova tools A

Download the latest directory from our [ftp_server](ftp://rover.teamdiana.org:2525/nova/)
Currently, the latest compressed directory is named *nova-core-dist-20160616.tar.xz*
In the terminal, uncompress it with:

```bash
# run this command where the file was downloaded. Change directory with cd
tar -xvf nova-core-dist-20160616.tar.xz
```

The execute the *gensetup.sh* script

```bash
./gensetup.sh
```

This script created a new file, *setup.sh*, that must be loaded. 

```bash
# load the setup.sh file
source setup.sh
```


### Setup Nova tools B

**TODO: write this part**

### Create a new workspace

Now let's create a workspace. The workspace contains your project code and configuration. You should have at least one workspace.

**important:** Remember to load the *setup.sh* as specified above

important: There are two *setup.sh* files: one is in the nova installation directory. This file is needed to load nova tools. Another file is in the workspace and is generated using the following commands. Remember that when you want to work in the workspace you need to load the *setup.sh* file **in the workspace**

```bash
# Create a new directory for the workspace. This can be done everywhere
mkdir workspace
# Initialize the workspace
CoreWorkspace.py initialize
```

Once again, a *setup.sh* file was created. This file must be loaded **every time** you want to use this workspace

Now we add a new module to the workspace. A module is a particular board. The available module can be listed with:

```bash
Core.py ls
```

they appear under the **MODULES** section.

### Add a module

Let's add a **stepper** module for instance:

In the workspace directory:

```bash
# We are working in the workspace, so remember to source the setup.sh file
source setup.sh
# Now let's add the module
CoreWorkspace.py module add stepper trial
```

Ok, now the module was added. Let's ask the tools to generate the eclipse and cmake project

```bash
CoreWorkspace.py generate
```


Now we can open the project with eclipse. 

### Open a workspace with eclipse

- File  Import... -> Existing Projects into Workspace 
- Select root directory: Browse to the workspace directory
- Finish

Use the Build All command (CTRL+B) in order to compile everything

Everytime you compile a new **ELF** file is generated inside the build/ directory (Look for the module name)

For instance, now we have generated a WORKSPACE/build/trial/trial **ELF** file

### Program the board

Programming can be done using the following commands

```bash
# recompile everything, just to be sure
make 
# transform the ELF file in a BIN file, suitable for programming
arm-none-eabi-objcopy -O binary trial trial.bin 
# flash the board
st-flash write trial.bin 0x8000000
```

The programmer should blink during the process. A correct flash procedure is indicated by a fixed green led on the programmer.

See [Nucleo ST-Link flash](#Nucleo_ST-Link_flash) for info on how to wire the board

## Nucleo ST-Link flash

The ST-Link v2 programmer of any stm32 nucleo board can be used to program nova boards. The wires must be connected following these schematics:


![Nova cortex 10pin jtag](/uploads/nova_cortex_jtag.png)

![Stlink2 swd](/uploads/swd_nucleo_stlink2.png)

Note: Vcc pin must be connected to a 3.3V voltage source, preferably the left PIN of connector **C1**

Note: **CN2** Jumpers must be off (not connected) 

The 10-ping SWD Cortex header pins  on the board are similar to a **FFSD-05-D-12.00-01-N** connector. Two rows, 1.27mm pitch

A compatible cable is	**FFSD-05-D-12.00-01-N**
