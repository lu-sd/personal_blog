---
title: "Basic Linux "
publishedAt: 2024-09-15
description: "Linux can help you understand digital world better after you understading it"
slug: "60-linuxBasic"
isPublish: true
---

## What is shell,teminal and bash?

Shell: A shell interprets the commands given by the user and passes them to the kernel for execution. There are different types of shells, such as Bash, Zsh, and Fish.

Terminal: A terminal (or terminal emulator) is a program that provides access to the shell. It allows you to type commands and see the output. The terminal itself doesn't execute commands; it just displays the shell's interface. Examples of terminal programs include GNOME Terminal, Windows Terminal, and iTerm2 on macOS.

Bash: Bash stands for Bourne Again Shell, and it's one of the most widely used shells, especially on Linux and macOS systems. It's a specific type of shell with its own syntax and built-in commands.
In short:

- A terminal is a program you use to interact with a shell.
- A shell is the command interpreter that actually executes the commands.
- Bash is one type of shell, but there are others.

In the client-server model analogy, the terminal acts as the client that sends requests (commands), and the shell acts as the server that processes those requests and returns responses (output).

## Relationship between kernel,OS and shell

The kernel is the core part of the operating system.It controls all lower-level interactions with the computer’s hardware.

The OS is the complete system,including all tools, interfaces, and the kernel.The OS, through the kernel, performs all the necessary tasks:

- Resource Allocation and Management: like process managemnet(cpu),memory management(ram) and storage managemnet(hard drive).
- Flie Management: files are stored in structured way(tree file system,multiple root folders).
- Device Managemnet.

* Security, Networking.

The shell is the interface that users interact with to send commands to the kernel.

## Difference Between a Process and a Program:

- A program is a passive entity that refers to a set of instructions stored on disk (like a file). It doesn't actively use any CPU or memory.
- A process is the active execution of a program, with its own memory, state, and resources managed by the operating system.

## More about process

OS decides which process gets the processor(cpu), when and for how much time and allocates the processor to the precess.

When a user or another program requests to execute a program, the kernel creates a new process.This can occur when a user launches an application, when a parent process forks a child process, during system boot, or in response to external or scheduled events.

System Boot (Initialization Processes)
When the system boots up, the kernel creates a special process called the init process (or systemd on modern Linux systems). This is the first process created by the kernel and is responsible for launching all other system processes, such as background services and daemons.

## Virtualization,hypervisor,and VMI

Virtualization is the broader concept, In essence, it separates the hardware layer from the software running on it, enabling the running of multiple virtual machines (VMs) on a single physical machine.

Hypervisors are the critical technology that makes the concept a reality.

A Virtual Machine Image (VMI) is a file or collection of files that contain a pre-configured operating system, application software, and settings necessary to create a fully operational virtual machine.

A Virtual Machine Image simplifies the process of deploying and managing virtualized environments by providing a complete, ready-to-use snapshot of a system, which can be replicated and deployed across various platforms.

Amazon Machine Image (AMI): In AWS, an AMI is a type of virtual machine image that contains the OS and any other software needed to launch instances on Amazon EC2.

## Root user, regular user, service user

The root account is already present by default. You can enable it or use sudo, and it is the superuser with UID 0.

Regular users: created with useradd -m username and granted sudo privileges if needed, which means regular user with sudo privileges can execute administrative commands as the root user by prefixing the command with sudo:

```bash
# If you want to give the new user administrative privileges, add them to the sudo group:
sudo usermod -aG sudo username

# to create a regular user: -m option creates a home directory for the user in /home/username.
sudo adduser username

```

A service user is typically a system account created for running a service or daemon. These accounts usually don’t have login capabilities and have limited permissions.

```bash
# -r for system account, -s nologin for no login capability.
sudo useradd -r -s /usr/sbin/nologin myserviceuser

```

Uers permission are related to reading, writing and executing files.

## Redirection in Linux:

Every program has 3 built-in streams:

- stdin (file descriptor 0): The input stream, usually from the keyboard, but can be redirected from a file or another program.
- stdout (file descriptor 1): The output stream, usually directed to the terminal, but can be redirected to a file or another program.
- stderr (file descriptor 2): The error stream, used for error messages, which can also be redirected separately from stdout.

```bash
# Redirect stdin: This command will make the program read from input.txt instead of from the terminal.
$ program < input.txt

# Redirect stdout:This command will make the program's output go into output.txt instead of being displayed in the terminal.
$ program > output.txt

# Append to a file using stdout:This will append the program’s output to the file output.txt without overwriting its contents.
$ program >> output.txt
#Example:cat reads from file.txt (via stdin) and writes the result to output.txt (via stdout).
$ cat < file.txt > output.txt

```

## Environment Variables

PATH is an environment variable,is a colon-separated list of directories that the shell searches through when you type a command.

It allows users to run programs without needing to provide the full path, and it can be customized by adding or modifying directories to make running programs more convenient.

Modifying the PATH

```bash
# To temporarily add a directory to your PATH (valid for the current session only):
export PATH=$PATH:/path/to/your/directory
export PATH=/path/to/your/directory:$PATH
# Permanently Modifying PATH: To make changes to PATH permanent, you can modify your shell configuration files (e.g .bashrc),command same as above:
export PATH=$PATH:/path/to/your/directory
```

Example:
If you want to add the directory /home/user/myprograms to your PATH so that you can run programs located there without typing the full path, you would run:

```bash
export PATH=$PATH:/home/user/myprograms
# Now, if there's an executable called myapp in /home/user/myprograms, you can simply type:
myapp
# Instead of
/home/user/myprograms/myapp
```

## socket tcp/ip http

A socket is an endpoint for communication between two machines. It is the programming interface that allows processes (programs) to send and receive data over a network.

Types of Sockets:

- TCP sockets: Used for reliable, connection-oriented communication (e.g., in HTTP, HTTPS).
- UDP sockets: Used for connectionless, unreliable communication (e.g., in video streaming, online gaming).

In a typical client-server architecture, the client and server communicate over a TCP/IP network, When a browser requests a web page via HTTP, it first establishes a TCP connection using sockets. HTTP requests and responses are sent over this TCP connection.

HTTP (HyperText Transfer Protocol) is an application-layer protocol built on top of the TCP/IP stack. It is used for transmitting hypertext (web pages) between clients (browsers) and servers (web servers).

How http Works:

- A client (usually a web browser) wants to load a webpage.The client process opens a socket and connects to the server’s IP address and port (e.g., port 80 for HTTP).

- TCP/IP establishes a connection between the client and the server.

* The client sends an HTTP request over this TCP connection

- The server process (e.g., web server) reads the HTTP request from its own socket, processes it, and sends back an HTTP response.

* The TCP connection ensures that the data is delivered reliably.

- After the communication, the socket can be closed by either the client or server.
