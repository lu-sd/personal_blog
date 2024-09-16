---
title: "Basic Linux "
publishedAt: 2024-09-15
description: "Linux can help you understand digital world better after you understading it"
slug: "60-linuxBasic"
isPublish: true
---

## what is shell,teminal and bash?

Shell: A shell interprets the commands given by the user and passes them to the kernel for execution. There are different types of shells, such as Bash, Zsh, and Fish.

Terminal: A terminal (or terminal emulator) is a program that provides access to the shell. It allows you to type commands and see the output. The terminal itself doesn't execute commands; it just displays the shell's interface. Examples of terminal programs include GNOME Terminal, Windows Terminal, and iTerm2 on macOS.

Bash: Bash stands for Bourne Again Shell, and it's one of the most widely used shells, especially on Linux and macOS systems. It's a specific type of shell with its own syntax and built-in commands.
In short:

- A terminal is a program you use to interact with a shell.
- A shell is the command interpreter that actually executes the commands.
- Bash is one type of shell, but there are others.

## Relationship between kernel,OS and shell

The kernel is the core part of the operating system.It controls all lower-level interactions with the computer’s hardware.

The OS is the complete system, including all tools, interfaces, and the kernel.The OS, through the kernel, performs all the necessary tasks, like managing files and memory, to give the desired output

The shell is the interface that users interact with to send commands to the kernel.

## Difference Between a Process and a Program:

- A program is a passive entity that refers to a set of instructions stored on disk (like a file). It doesn't actively use any CPU or memory.
- A process is the active execution of a program, with its own memory, state, and resources managed by the operating system.

## More about process

When a user or another program requests to execute a program, the kernel creates a new process.This can occur when a user launches an application, when a parent process forks a child process, during system boot, or in response to external or scheduled events.

System Boot (Initialization Processes)
When the system boots up, the kernel creates a special process called the init process (or systemd on modern Linux systems). This is the first process created by the kernel and is responsible for launching all other system processes, such as background services and daemons.
