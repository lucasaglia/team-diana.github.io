# FTP server

An FTP server is available on the rpi2 board at the port **2525**:

```bash
ftp ftp.teamdiana.org -p 2525
```

If using filezilla, please try to enable **Passive mode**

The server works in the /media/sda2/ftp/ directory

FTP server has a *public* directory (*/media/sda2/ftp/public/*) with anonymous read permission

You can login by using your username and password. Logged user can also upload in any directory in */media/sda2/ftp*
Users must be member of the **ftpusers** group. They can be added with

```bash
sudo usermod -aG ftpusers username
```


