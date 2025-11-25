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

`kwctl` is the command-line interface (CLI) tool for Kubewarden. Below are installation instructions for some operating systems.


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

If you use the Homebrew package manager on Linux, then:

```bash
brew install kwctl
```

Verify Installation:
```bash
kwctl --version
```

### Using Zypper (openSUSE)

```bash
zypper install kwctl
```

### Using AUR (Arch User Repository)

If you're using Arch Linux, or an Arch-based distribution, you can install kwctl from the AUR.

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

#### Verify the installation
```bash
kwctl --version
```

### Manual installation

1. Download the latest release of `kwctl` for Linux:
    ```bash
    curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-x86_64.zip
    ```

    For ARM64 systems (e.g., Raspberry Pi), use:
    ```bash
    curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-linux-aarch64.zip
    ```
1. Extract the files from the downloaded `.zip` file:
    ```bash
    unzip kwctl-linux-x86_64.zip
    ```

    This extracts the following files:

    - `kwctl-linux-x86_64`: The `kwctl` binary
    - `kwctl-linux-x86_64.sig`: A signature file for verifying the binary
    - `kwctl-linux-x86_64.pem`: A certificate file for verifying the signature

1. Move the binary to a directory in your PATH, rename to `kwctl` and make executable.

1. Verify the installation:
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

Verify installation:

```bash
kwctl --version
```

### Manual installation

1. Download the latest release of `kwctl` for macOS:
    - For **Apple Silicon (ARM64)** systems, use:
        ```bash
        curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-aarch64.zip
        ```
    - For **Intel (x86_64)** systems, use:
        ```bash
        curl -LO https://github.com/kubewarden/kwctl/releases/latest/download/kwctl-darwin-x86_64.zip
        ```
1. Extract the files from the downloaded `.zip` file:
    ```bash
    unzip kwctl-darwin-x86_64.zip
    ```
    This extracts the following files:
    - `kwctl-darwin-x86_64`: The `kwctl` binary
    - `kwctl-darwin-x86_64.sig`: A signature file for verifying the binary
    - `kwctl-darwin-x86_64.pem`: A certificate file for verifying the signature
1. Move the binary to a directory in your PATH, rename to `kwctl` and make executable.
1. Verify the Installation
    Check the `kwctl` installation:
    ```bash
    kwctl --version
    ```
</TabItem>

<TabItem value="windows">

## Install for Windows

1. Download `kwctl`
    1. Open your browser and go to the [Kubewarden releases page](https://github.com/kubewarden/kwctl/releases/latest)
    1. Download the `kwctl-windows-x86_64.zip` file.
1. Extract the files from the downloaded zip file. It will contain:
    - `kwctl-windows-x86_64.exe`: the `kwctl` binary.
    - `kwctl-windows-x86_64.sig`: a signature file for verifying the binary.
    - `kwctl-windows-x86_64.pem`: a certificate file for verifying the signature.
1. Rename the binary file from `kwctl-windows-x86_64.exe` to `kwctl.exe` for easier use.
1. Move the binary to a location covered by your `PATH` environment variable.
1. Verify the installation. Open a new command prompt or PowerShell window and check the `kwctl` installation:
    ```cmd
    kwctl --version
    ```
</TabItem>
</Tabs>

## Install shell completions

The `kwctl` CLI has the `--shell` option to generate shell completion commands for your shell. You can use the output from this command to integrate completions into your shell.

```bash
kwctl completions --shell [bash|elvish|fish|powershell|zsh]
```
