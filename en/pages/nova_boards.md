# Nova Boards

## How to program

### Requirements:

- Linux (preferably ubuntu, but others are fine too)
- Eclipse (preferably CDT version, downloadable [here](http://www.eclipse.org/downloads/packages/eclipse-ide-cc-developers/mars2) )
* Python and some python packages

#### Python packages installation

```bash
# commands for ubuntu
sudo apt-get install pip 
sudo pip install argcomplete gitpython colorama avro tabulate
```

### Setup Nova tools 

First, it is necessary to setup nova tools. These tools allow to create a new workspace, add/remove packages, configure the board and eventually write your firmware.
Read the [docs for more details](http://docs.novalabs.io)

A pre-created, ready to use, compressed directory was created in order to speed up the setup process. Follow [Setup Nova tools - A](#Setup_Nova_tools_A) in order to use the compressed 
directory, otherwise follow [Setup Nova Tools - B](#Setup_Nova_tools_B)

### Setup Nova tools A

Download the latest directory from google drive or from this [slack link](https://files.slack.com/files-pri/T0E2UUQ0M-F1AK4UTV1/download/nova-core-dist-20160520.tar.xz)
Currently, the latest compressed directory is named *nova-core-dist-20160520.tar.xz*
In the terminal, uncompress it with:

```bash
tar -xvf nova-core-dist-20160520.tar.xz
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

