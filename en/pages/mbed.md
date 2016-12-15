# MBED


##Setup the development environment

###Windows

####Install the software packages

1. Download the [Eclipse CDT](https://eclipse.org/cdt/downloads.php)
	This version is standard eclipse with additional packages suitable for C/C++ development
    Please select the 32 or 64 version depending on your computer and **java installation**.
2. Install the [gcc-arm-none-eabi](https://launchpad.net/gcc-arm-embedded/+download)
	This is a modified version of the **GCC** compiler that targets ARM processors. We will 
    setup eclipse in order to use this version. It is often updated and it tracks the original GCC branch
    Currently only the 32bit version is available.
    

####Open a Makefile project

After having download an mbed project from the online compiler (see [Export online compiler project](mbed.md#Export_online_compiler_project) or having cloned a git project (see [git](git.md) ) 

##Export online compiler project

### Using the online interface

WARNING: this method as of today (12/2016) is discouraged since the MBED online interface has many problems. use **mbed-cli** instead

It is possible to export an online project and open it in eclipse. 
Go to the online compiler, click with the right mouse button on the project directory, select export -> GCC compiler, or, from the project page, click on **export to desktop IDE** 

![mbed_export1](mbed-export1.png)
![mbed_export_gcc](export_gcc.png)

NOTE: Make sure to select the **Also include repositories and other files** checkbox

### Using mbed-cli 

[mbed-cli](https://github.com/ARMmbed/mbed-cli) is a collection of python scripts that allow to manage
mbed repository.

#### Install mbed-cli:

```bash
sudo pip install mbed-cli
```

#### Export a repository:

- clone the online repository to a local directory

```bash
mbed import https://github.com/ARMmbed/mbed-os-example-blinky
```

- export the repository to make 

```bash
mbed export -i gcc_arm -m NUCLEO_F401RE
```

This will create a Makefile inside the projectfiles/PLATFORM_NAME directory
