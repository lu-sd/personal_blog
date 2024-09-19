---
title: "Basic Docker"
publishedAt: 2024-09-17
description: "VM vs docker"
slug: "61-docker"
isPublish: true
---

## Disadvantages of VMs and advantages of Docker

- Disadvantages of VMs:

  - Each VM runs its own complete operating system.
    Slower Start-Up: VMs usually take longer to boot as they load a full operating system.
  - ssHeavy Resource Usage: VMs need more memory, CPU, and disk space because each VM includes its own full operating system.

* Advantages of Docker:

  - Lightweight: Docker containers share the host OS, making them use fewer resources (CPU, memory, and storage).

  - Fast Start-Up: Containers start almost instantly, making them much quicker than VMs.

In simple terms, Docker is like packing a small suitcase with just the essentials for a quick trip, while a VM is like moving your entire house to travel somewhere—it’s bigger, heavier, and takes longer to set up.

## Docker's architecture

Docker's architecture is based on client-server communication, where the Docker client communicates with the Docker daemon to build, run, and manage containers. Here’s a breakdown of its main components:

- 1. Docker Client
     The Docker client is what you interact with. It sends commands to the Docker daemon (e.g., docker run, docker build) via a REST API. The client can run on the same machine as the Docker daemon or connect to a remote one.
- 2. Docker Daemon (dockerd)
     The Docker daemon is the core of Docker's architecture, is the server component of Docker Engine that listens for API requests and manages the various Docker objects like images, containers, networks, and volumes.

Docker Engine is the overarching term for the Docker platform, which includes both the Docker client and daemon, as well as additional components that help manage containerization.

## Docker container vs process

A Docker container is very similar to a process, but with some important differences:

- Similarities to a Process:

  - Lightweight: Like a process, a container runs an application with its own isolated resources (CPU, memory, etc.) and has its own process ID.

  - Runs on the Host OS Kernel: Containers, like processes, share the host operating system's kernel. This makes them lightweight compared to virtual machines, which run a full OS.

  - Lifecycle: A container starts, runs, and stops like a process. When you stop a container, it's similar to killing a process.

* Key Differences:

  - Isolation: A container is more isolated than a typical process. It has its own file system, network interfaces, and process namespace, so it can behave as if it’s the only application running on the system.

  - Portability: Containers package not only the application but also its dependencies. This makes them more portable across different environments, while a typical process relies on the system’s environment.

  - Networking and Storage: Containers have separate virtualized networking and persistent storage, unlike ordinary processes, which share the host’s resources more directly.

In summary, you can think of a Docker container as a highly isolated, lightweight process that includes everything needed to run an application.

## Summary of Docker Workflow:

1.Write code → 2. Create Dockerfile → 3. Build image → 4. Run container → 5. Test/debug → 6. Push to registry (optional) → 7. Deploy to production → 8. Manage containers
