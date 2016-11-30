# TK1 

Main board of T0-R0, used for connection, image processing and SLAM

## First install

Follow [elinux.org Flashing Jetson TK1](http://elinux.org/Jetson/Porting_Arch#Flashing_Jetson_TK1).

Once the image is ready (after the **sudo ./apply_binaries.sh** command is applied) the image can be flashed every time with:

```bash
sudo ./flash.sh jetson-tk1 mmcblk0p1
```

The default username and password are *alarm* and *alarm*

## Direct Connection via DHCP

By default, a new flashed arch image start a dhcp client. 

By directly connecting your computer to the tk1 via an ethernet cable 
you can connect to the board using ssh. A suitable configuration of your computer may be the following:

*/etc/dhcpd.conf*:

```bash
option domain-name-servers 8.8.8.8, 8.8.4.4;
option subnet-mask 255.255.0.0;
option routers 192.168.1.100;
subnet 192.168.0.0 netmask 255.255.0.0 {
  range 192.168.1.101 192.168.1.101;
}
```

**ip configuration:**

```bash
#!/bin/bash
sudo ip addr add 192.168.1.100/28 dev enp2s0f1
sudo ip link set enp2s0f1 up
sudo  sysctl net.ipv4.ip_forward=1
sudo iptables -t nat -A POSTROUTING -o wlp3s0 -j MASQUERADE
sudo iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i enp2s0f1 -o wlp3s0 -j ACCEPT
```

Check out the output of dhcpd, it should be something like this:

```bash
$ sudo systemctl status dhcpd4.service
...
May 30 11:20:08 clynamen-arch-asus systemd[1]: Starting IPv4 DHCP server...
May 30 11:20:08 clynamen-arch-asus dhcpd[25464]: Source compiled to use binary-leases
May 30 11:20:08 clynamen-arch-asus dhcpd[25464]: Wrote 0 leases to leases file.
May 30 11:20:08 clynamen-arch-asus systemd[1]: Started IPv4 DHCP server.
May 30 11:20:08 clynamen-arch-asus dhcpd[25467]: Server starting service.
May 30 11:20:37 clynamen-arch-asus dhcpd[25467]: DHCPDISCOVER from 00:04:4b:21:33:af via enp2s0f1
May 30 11:20:38 clynamen-arch-asus dhcpd[25467]: DHCPOFFER on 192.168.1.101 to 00:04:4b:21:33:af (alarm) via enp2s0f1
May 30 11:20:38 clynamen-arch-asus dhcpd[25467]: DHCPREQUEST for 192.168.1.101 (192.168.1.100) from 00:04:4b:21:33:af (alarm) via enp2s0f1
May 30 11:20:38 clynamen-arch-asus dhcpd[25467]: DHCPACK on 192.168.1.101 to 00:04:4b:21:33:af (alarm) via enp2s0f1
...
```

Using this way, the ip address **192.168.1.101** is assigned to the board. 


## Add a new user

```bash
useradd -m -g users -G wheel -s /bin/bash archie
usermod -aG video archie
```

## Check status of the nvidia software

```bash
sudo sha1sum -c /etc/nv_tegra_release
```

## Notes

```
02-06-2016: installing ogre-1.8 without gl support, used a modified PKGBUILD
```

## Enable USB 3.0 support
In /boot/extlinux/extlinux.conf
change:
```
usb_port_owner_info=0
```
to
```
usb_port_owner_info=2
```