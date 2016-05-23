
# Server Status

Currently three servers are available:

```bash
tk1:
ssh USERNAME@rover.teamdiana.org -p 587
udoo:
ssh USERNAME@rover.teamdiana.org -p 3389
rpi2:
ssh USERNAME@rover.teamdiana.org 
```

## TK1

A Jetson TK-1 devkit. This server will be the heart of the T0-R0 rover. 

|                    |                         |
|--------------------|-------------------------|
| local ip address   | 10.0.0.5                |
| public ssh address | rover.teamdiana.org:587 |
| hostname           | tk1                     |



## Udoo Quad

A Udoo Quad board. This server will be the mate of the tk1 inside the T0-R0 rover.

|                    |                          |
|--------------------|--------------------------|
| local ip address   | 10.0.0.4                 |
| public ssh address | rover.teamdiana.org:3389 |
| hostname           | udoo                     |

## Raspberry PI 2 

A raspberry pi 2 board. Used as NAS, server for useful stuff and a lot more

|                    |                        |
|--------------------|------------------------|
| local ip address   | 10.0.0.2               |
| public ssh address | rover.teamdiana.org:22 |
| hostname           | rpi2                   |

