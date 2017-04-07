# ssh

ssh is a tool that allow to connect to a remote computer with a secure connection.

## How To

In order to use a remote computer with ssh, follow these step

### General configuration (do this only once)

- Install ssh
- Generate your ssh keys: [archlinux guide](https://wiki.archlinux.org/index.php/SSH_keys#Generating_an_SSH_key_pair)

WARNING: you can share your **public keys** (*~/.ssh/id_rsa.pub*) but do not show anyone your **private key**! (*~/.ssh/id_rsa*) 

WARNING: your key must be password protected. If it is not, you will be removed by the system administrator

- send the public key to the system administrator. Ask him to create a user with your username and 
to add the public key in /home/USERNAME/.ssh/authorized_keys

### Connection:

- connect with:

```bash
ssh USERNAME@server_address
```

you will be asked the password of your key. Insert it

### ssh-agent 

inserting the key password every time you want to open a new shell is a waste of time. 
ssh-agent allows to solve this problem.

It is advised to add this lines in your *~/.bashrc*:

```bash
if [[ ! -f /tmp/ssh-agent.sh ]]; then
  ssh-agent | grep -v echo > /tmp/ssh-agent.sh
fi
source /tmp/ssh-agent.sh
```

open a new shell, and type 

```bash
ssh-add
```

and insert the key. Once you type this command, you will not be asked your key password
till the next computer restart.
