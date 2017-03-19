# Nova Boards

In order to develop on the Nova boards, the Nova Core tools must be properly installed and set up.  These tools allow you to create a new workspace, add/remove packages, configure the board.  Read the [docs for more details](http://docs.novalabs.io)

## See also:

[nova mw](nova_mw.md)

## Requirements:

- Linux (preferably ubuntu, but others are fine too)
- Eclipse (preferably CDT version, downloadable [here](http://www.eclipse.org/downloads/packages/eclipse-ide-cc-developers/mars2) )
- **GNU ARM Eclipse** tools, downloadable from either the [site](http://gnuarmeclipse.github.io/) or the [Eclipse marketplace](https://marketplace.eclipse.org/content/gnu-arm-eclipse),
- Python
- [Texane STlink tool](https://github.com/texane/stlink) 

## Installation and setup

(If you don't want or can't install the tools on your own Linux OS, it is also possible to use the [prebuilt virtualbox image](nova_vbox_image.md); in this case, you can skip right to [Create a new workspace](#Create_a_new_workspace)).

The installation is entirely automated.  First create a dedicated directory which will contain the Nova tools and the projects (in the following example it's a `nova` directory directly under the home directory; feel free to create it anywhere else), and then download and run the installation script:

```sh
mkdir ~/nova
cd ~/nova
wget -qO- http://get-core.novalabs.io/ | sh
```

Note: python2 is required, archlinux users should checkout [python2 vs python3](archlinux.md#python2_vs_python3)

Remember, every time you open a new shell (e.g. open a new terminal window) you'll need to run the following command:

```sh
source ~/nova/core/setup.sh
```

This will configure the currently running shell, and allow it to find the tools when you call them from the command-line.  Make sure you've run the above command if you see the following message when running, for example, the `CoreWorkspace.py` command:

```
bash: CoreWorkspace.py: command not found...
```

### Texane's stlink tool

The better way of getting the `stlink` tools is to get the source code and compile it yourself.  Make sure some basic development tools are installed (they most likely are, if you've run Nova Core's installation script like in the above paragraph).

```sh
git clone https://github.com/texane/stlink
cd stlink
mkdir build
cd build
cmake ..
make
sudo make install
sudo cp etc/udev/rules.d/* /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger
```

## Creating a new workspace

Now let's create a workspace. The workspace contains your project code and configuration. You should have at least one workspace.

**Important:** Remember to load the `setup.sh` as specified above.

**Important:** There are two `setup.sh` files: one is in the nova installation directory. This file is needed to load Nova tools. Another file with the same name is in the workspace and is generated using the following commands. Remember that when you want to work in the workspace you need to load the `setup.sh` file **in the workspace**.

```bash
# Create a new directory for the workspace. This can be done anywhere
mkdir workspace
cd workspace
# Initialize the workspace
CoreWorkspace.py initialize
```

Once again, a `setup.sh` file was created. This file must be loaded **every time** you want to use this workspace

Now we add a new module to the workspace. A module is the support for a particular board. The available modules can be listed with:

```bash
Core.py ls
```

They'll appear under the **MODULES** section.

### Add a module

Let's add a `stepper` module for instance:

In the workspace directory:

```bash
# We are working in the workspace, so remember to source the setup.sh file
source setup.sh
# Now let's add the module
CoreWorkspace.py target add stepper trial
```

Ok, now the module was added. Let's ask the tools to generate the CMake project, along with a Makefile and an Eclipse project:

```bash
CoreWorkspace.py generate
```

Since you have a Makefile (under `build/debug/TARGET` or `build/release/TARGET`), you can use any text editor or IDE you want, but Eclipse is recommended: we've tested it and the tools have explicit support for it.

### Open a workspace with Eclipse

- File -> Import... -> Existing Projects into Workspace 
- Select root directory: Browse to the workspace directory
- You might want to check that the *Search for Nested Projects* option is enabled
- Finish

Use the *Build All* command (CTRL+B) in order to compile everything. This will generate the executable file for your project in the **ELF** format in the `build/MODE/TARGET` directory, where `MODE` is either `debug` or `release`, and `TARGET` is the name of your module target (i.e. the board you're targeting, such as `imu`, `stepper`, ...).

### Program the board

Programming (transferring the program on the board) can be done using the following commands in the build directory (e.g. under the workspace, `build/debug/stepper`):

```bash
# recompile everything, just to be sure
make
# transform the ELF file in a BIN file, suitable for programming
arm-none-eabi-objcopy -O binary trial trial.bin
# flash the board
st-flash write trial.bin 0x8000000
```

The programmer should blink during the process. A correct flash procedure is indicated by a fixed green led on the programmer and a reassuring message on your terminal (*... jolly good!*).

See [Nucleo ST-Link flash](#Nucleo_ST-Link_flash) for info on how to wire the board.

## Working with git


The workspace can be shared with git. 

### Pushing a new workspace online

Inside the workspace main directory, init a new repository
```bash
git init
```
then, add a *.gitignore* file

```bash
*~
.project
build/
generated/
.cproject
.project
*.launch
src/targets/*/CMakeLists.txt
```


then add the existing files, commit

```bash
git add -A 
git commit -m 'first commit'
```

Also push the repo on github (create a new repo on github and follow the instructions

### Cloning a workspace

Use the suggested clone command from the github's repo page, such as

```bash
git clone git@github.com:team-diana/REPO_NAME.git
```

then, enter in the directory ( *cd REPO_NAME* ) and type

```bash
CoreWorkspace.py generate
```

in order to generate the Makefile and project files.

## Nucleo ST-Link flash

The ST-Link v2 programmer of any stm32 nucleo board can be used to program nova boards. The wires must be connected following these schematics:


![Nova cortex 10pin jtag](/uploads/nova_cortex_jtag.png)

![Stlink2 swd](/uploads/swd_nucleo_stlink2.png)

Note: Vcc pin must be connected to a 3.3V voltage source, preferably the left PIN of connector **C1**

Note: **CN2** Jumpers must be off (not connected) 

The 10-ping SWD Cortex header pins  on the board are similar to a **FFSD-05-D-12.00-01-N** connector. Two rows, 1.27mm pitch

A compatible cable is	**FFSD-05-D-12.00-01-N**

## The Boards

[STM32F3, STM32F4 and STM32L4 Series Cortex®-M4 programming manual](http://www.st.com/content/ccc/resource/technical/document/programming_manual/6c/3a/cb/e7/e4/ea/44/9b/DM00046982.pdf/files/DM00046982.pdf/jcr:content/translations/en.DM00046982.pdf)

### ARM Processors

#### ARM Cortex M4

STM32F3, STM32F4 are Cortex M4 processors

[Cortex M4 Guide](http://infocenter.arm.com/help/topic/com.arm.doc.dui0553a/DUI0553A_cortex_m4_dgug.pdf)

#### CMSIS

CMSIS is a standard interface for the ARM Cortex processors. 

*The CMSIS enables consistent device support and simple software interfaces to the processor and the peripherals, simplifying software re-use, reducing the learning curve for microcontroller developers, and reducing the time to market for new devices.*

[CMSIS HTML Guide](http://www.keil.com/pack/doc/CMSIS/General/html/index.html)
[CMSIS Duolos Tutorial](https://www.doulos.com/knowhow/arm/CMSIS/CMSIS_Doulos_Tutorial.pdf)

#### CMSIS-RTOS

CMSIS-RTOS is a full Real-Time OS based on CMSIS for the ARM Cortex processors.

*The RTOS kernel can be used for creating applications that perform multiple tasks simultaneously. These tasks are executed by threads that operate in a quasi-parallel fashion.*

Chibi-OS is built on top of CMSIS-RTOS, adding a little extra layer.

[CMSIS-RTOS HTML GUIDE](http://www.keil.com/pack/doc/CMSIS/RTOS/html/index.html)

### Stepper

- [STM32F303CBT6](http://www.st.com/content/st_com/en/products/microcontrollers/stm32-32-bit-arm-cortex-mcus/stm32f3-series/stm32f303/stm32f303cb.html)

### USB
### GPS+IMU
### BLDC

## Logging and Debug 

### ITM

It is possible to perform real-time logging using the [ITM capabilities of ARM processors](https://www.arm.com/files/pdf/Serial_Wire_Debug.pdf) 

This mechanism is faster that classical JTAG output and allows us to use the same connections used for programming the board (note: the **SWO** pin must be connected)

For an example, check out the [nova_swd_output_example](https://github.com/team-diana/nova_swd_output_example) project. 

The microcontroller can write to the SWO pin with this simple function:

```c
void SWV_puts(const char *s )
{
    while (*s) ITM_SendChar(*s++);
}

/// usage:
SWV_puts("hello world\n");
```

The ITM_SendChar macro is provided by CMSIS.

After having uploaded the firmware on the board, run openocd with the swo_on_file.openocd configuration:

```bash
openocd -f swo_on_file.openocd
```

the output will be written in swo.log:

## EXPERIMENTAL: WINDOWS SUPPORT

####Install the software packages

1. Download the [Eclipse CDT](https://eclipse.org/cdt/downloads.php)
	This version is standard eclipse with additional packages suitable for C/C++ development
    Please select the 32 or 64 version depending on your computer and **java installation**.
2. Install the [gcc-arm-none-eabi](https://launchpad.net/gcc-arm-embedded/+download)
	This is a modified version of the **GCC** compiler that targets ARM processors. We will 
    setup eclipse in order to use this version. It is often updated and it tracks the original GCC branch
    Currently only the 32bit version is available.
3. Install [Python **2.7**](https://www.continuum.io/downloads)
	It is important to download the **2.7** version. The linked anaconda package is quiet good and contains 
    python's **pip** package manager

https://www.continuum.io/downloads
