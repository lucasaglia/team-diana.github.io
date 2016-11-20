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

## Flashing VESC with ST-Link\V2

In the VESC website is written to connect a programmer to the device in order to download the firmware. Any stm32 Nucleo boards can be used at this scope. The wires must be connected following these schematics:


![Vesc_SWO_connector]({{site.baseurl}}/http://vedder.se/wp-content/uploads/2015/01/B_Modules-11-1024x724.png)

![Stlink2 swd](/uploads/swd_nucleo_stlink2.png)

Note: Vcc pin must be connected to a 3.3V voltage source, preferably the left PIN of connector **C1**

Note: **CN2** Jumpers must be off (not connected)  


## See also:

[ChibiOS](chibios.md)
