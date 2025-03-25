---
sidebar_label: Install kwctl
sidebar_position: 15
title: Installing kwctl
description: Installing kwctl
keywords:
  [kubewarden, kubernetes, install kwctl, install, kwctl]
doc-persona: [kubewarden-all]
doc-type: [howto]
doc-topic: [install-kwctl]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/howtos/install-kwctl"/>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing kwctl (Kubewarden CLI)

`kwctl` is the command line interface (CLI) tool for Kubewarden. Below are installation instructions for some operating systems.

<Tabs
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'mac'},
    {label: 'Windows', value: 'windows'},
  ]}>
<TabItem value="linux">

## Install for Linux

### Using Homebrew 
```bash
brew install kwctl
```

Verify Installation:
```bash
kwctl --version
```

### Using AUR (Arch User Repository)

If you're using Arch Linux or an Arch-based distribution (like Manjaro or EndeavourOS), you can install kwctl from the AUR.

#### Using an AUR Helper (yay)
```bash
yay -S kwctl
```

#### Using makepkg
```bash
# Clone the AUR package
git clone https://aur.archlinux.org/kwctl.git
cd kwctl

# Build and install the package
makepkg -si
```

#### Verify the Installation
```bash
kwctl --version
```

### Manual Installation

#### Step 1: Download `kwctl`
Download the latest release of `kwctl` for Linux:
```bash
curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-x86_64.zip
```

For **ARM64** systems (e.g., Raspberry Pi), use:
```bash
curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-aarch64.zip
```

#### Step 2: Extract the Files to new folder
Extract the downloaded `.zip` file to new folder `kwctl-linux`:
```bash
unzip kwctl-linux-x86_64.zip -d ./kwctl-linux
```

This will extract the following files:
- `kwctl-linux-x86_64`: The `kwctl` binary
- `kwctl-linux-x86_64.sig`: A signature file for verifying the binary
- `kwctl-linux-x86_64.pem`: A certificate file for verifying the signature

#### Step 3: Go to the new directory `kwctl-linux`
```shell
cd ./kwctl-linux
```
#### Step 4: Move the Binary to `/usr/local/bin`
Move the binary to a directory in your `PATH`:
```bash
sudo mv kwctl-linux-x86_64 /usr/local/bin/kwctl
```

#### Step 5: Verify the installation
Check if `kwctl` is installed correctly:
```bash
kwctl --version
```

</TabItem>
<TabItem value="mac">

## Install for Apple

### Using Homebrew 
Install `kwctl`:
```shell
brew install kwctl
```

Verify Installation:
```bash
kwctl --version
```

### Manual Installation

#### Step 1: Download `kwctl`
Download the latest release of `kwctl` for macOS:


For **Apple Silicon (ARM64)** systems, use:
```bash
curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-aarch64.zip
```

For **Intel (x86_64)** systems, use:

```bash
curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-x86_64.zip
```


#### Step 2: Extract the Files
Extract the downloaded `.zip` file:
```bash
unzip kwctl-darwin-x86_64.zip -d ./kwctl-darwin
```

This will extract the following files:
- `kwctl-darwin-x86_64`: The `kwctl` binary
- `kwctl-darwin-x86_64.sig`: A signature file for verifying the binary
- `kwctl-darwin-x86_64.pem`: A certificate file for verifying the signature

#### Step 3: Go to the new directory `kwctl-darwin`
```shell
cd ./kwctl-darwin
```

#### Step 4: Move the Binary to `/usr/local/bin`
Move the binary to a directory in your `PATH`:
```bash
sudo mv kwctl-darwin-x86_64 /usr/local/bin/kwctl
```

#### Step 5: Verify the Installation
Check if `kwctl` is installed correctly:
```bash
kwctl --version
```

</TabItem>
<TabItem value="windows">

## Install for Windows

### Step 1: Download `kwctl`
1. Open your browser and go to the [Kubewarden releases page](https://github.com/kubewarden/kwctl/releases/latest)
2. Download the `kwctl-windows-x86_64.zip` file

### Step 2: Extract the Files in a new folder `kwctl-windows`
Extract the `.zip` file. It will contain:
- `kwctl-windows-x86_64.exe`: The `kwctl` binary
- `kwctl-windows-x86_64.sig`: A signature file for verifying the binary
- `kwctl-windows-x86_64.pem`: A certificate file for verifying the signature

### Step 3: Rename the Binary
Rename the binary file from `kwctl-windows-x86_64.exe` to `kwctl.exe` for easier use.

### Step 4: Add path of `kwctl-windows` to Your PATH
Add the directory containing `kwctl-windows-x86_64.exe` to your `PATH` environment variable:
- Open **System Properties** > **Environment Variables**
- Edit the `Path` variable and add the directory containing `kwctl-windows-x86_64.exe`

### Step 5: Verify the Installation
Open a new Command Prompt or PowerShell window and check if `kwctl` is installed correctly:
```cmd
kwctl --version
```

</TabItem>
</Tabs>

## Install Shell Completions

The `kwctl` CLI has the `--shell` option to generate shell completion commands for your shell. You can use the output from this command to integrate completions into your shell.

```bash
kwctl completions --shell [bash|elvish|fish|powershell|zsh]
```