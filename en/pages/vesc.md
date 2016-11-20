# VESC

http://vedder.se/2015/01/vesc-open-source-esc/   

![](http://vedder.se/wp-content/uploads/2015/01/PCB_Front-1024x683.png) VESC – Open Source ESC

## Install GCC 

The VESC website uses an old ppa, so, replace these commands:

```bash
sudo apt-get remove binutils-arm-none-eabi gcc-arm-none-eabi
sudo add-apt-repository ppa:terry.guo/gcc-arm-embedded
sudo apt-get update
sudo apt-get install gcc-arm-none-eabi=4.9.3.2015q3-1trusty1
```

with:

```bash
sudo add-apt-repository ppa:team-gcc-arm-embedded/ppa
sudo apt-get remove binutils-arm-none-eabi gcc-arm-none-eabi
sudo apt-get update
sudo apt-get install gcc-arm-none-eabi
```

Checkout https://launchpad.net/gcc-arm-embedded/+announcement/13824 for more infos. 


## See also:

[ChibiOS](chibios.md)
