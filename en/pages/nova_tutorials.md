# Tutorials NOVA

Official documentation from Nova Labs is available [here](http://docs.novalabs.io). Since the docs are currently (Nov 2016) somewhat sparse and lacking, we've collected some additional notes:

- [Nova Core Middleware](./nova_mw.md)

- [Nova Core Tools](./nova_tools.md)


## Creating a new workspace

- Make sure you have already loaded nova environment variables (using *source WORKSPACE/setup.sh*)

- Create and enter in a new directory, we call it *example-ws*

```bash
mkdir example-ws
cd example-ws
```

- Initialize the workspace: 

```bash
CoreWorkspace.py initialize
```

- Now these file and directories should appear inside the *example-ws* directory:

```bash
./WORKSPACE.json
./setup.sh
./generated
./generated/packages
./generated/modules
./build
./sources
./sources/targets
./sources/packages
```

- Let's add a module

```bash
CoreWorkspace.py module add stepper 'trial'
CoreWorkspace.py generate
```

