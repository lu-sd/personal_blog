---
title: "Basic about Docker"
publishedAt: 2024-09-17
description: "VM vs docker"
slug: "61-docker"
isPublish: true
---

Docker was initially designed for Linux, and it works natively on Linux systems, Docker supports Windows and macOS through Docker Desktop, where runs Linux containers using a lightweight virtual machine(using a hypervisor layer with a lightweight Linux distro).

## Disadvantages of VMs and advantages of Docker

- Disadvantages of VMs:

  - Each VM runs its own complete operating system.

  * Slower Start-Up: VMs usually take longer to boot as they load a full operating system.

  - Heavy Resource Usage: VMs need more memory, CPU, and disk space because each VM includes its own full operating system.

* Advantages of Docker:

  - Lightweight: Docker containers share the host OS, making them use fewer resources (CPU, memory, and storage).

  - Fast Start-Up: Containers start almost instantly, making them much quicker than VMs.

In simple terms, Docker is like packing a small suitcase with just the essentials for a quick trip, while a VM is like moving your entire house to travel somewhere—it’s bigger, heavier, and takes longer to set up.

## Docker's architecture

Docker's architecture is based on client-server communication, where the Docker client communicates with the Docker daemon to build, run, and manage containers. Here’s a breakdown of its main components:

1. Docker Client:
     The Docker client is what you interact with. It sends commands to the Docker daemon (e.g., docker run, docker build) via a REST API. The client can run on the same machine as the Docker daemon or connect to a remote one.
2. Docker Daemon (dockerd):
     The Docker daemon is the core of Docker's architecture, is the server component of Docker Engine that listens for API requests from the Docker Client (CLI or external programs) and manages the various Docker objects like images, containers, networks, and volumes.

Docker Engine is the overarching term for the Docker platform, which includes both the Docker client and daemon, as well as additional components that help manage containerization.

The Docker API is the communication layer between the client (CLI or external tools) and the Docker daemon. The API defines the commands that can be used to interact with the Docker Engine.

Docker CLI is the user-facing tool that sends commands to the Docker daemon via the API.

```rust
User -----> [Docker CLI] -----> [Docker API] -----> [Docker Daemon (Server)] -----> Containers, Images, Volumes, Network,etc.

```

## Docker container vs process

A Docker container is very similar to a process, but with some important differences:

1. Similarities to a Process:

     - Lightweight: Like a process, a container runs an application with its own isolated resources (CPU, memory, etc.) and has its own process ID.

     - Runs on the Host OS Kernel: Containers, like processes, share the host operating system's kernel. This makes them lightweight compared to virtual machines, which run a full own OS.

     - Lifecycle: A container starts, runs, and stops like a process. When you stop a container, it's similar to killing a process.

2. Key Differences:

     - Isolation: A container is more isolated than a typical process. It has its own file system, network interfaces, and process namespace, so it can behave as if it’s the only application running on the system.

     - Portability: Containers package not only the application but also its dependencies. This makes them more portable across different environments, while a typical process relies on the system’s environment.

     - Networking and Storage: Containers have separate virtualized networking and persistent storage, unlike ordinary processes, which share the host’s resources more directly.

In summary, you can think of a Docker container as a highly isolated, lightweight process that includes everything needed to run an application.

## File System

Docker uses UnionFS, a type of file system that allows multiple file system layers to be stacked on top of each other. This enables efficient use of storage by allowing shared, read-only layers while allowing specific writable changes in containers.

A Docker layer refers to a unit of data (changes made to the file system) in a Docker image, more like a checkpoint in a version control system (like Git commits):

- Each layer adds new changes, but the previous layers remain unchanged.
- When a new layer is created, it builds on top of the previous ones, just like how new commits add changes without altering earlier commits.

### Layers and Images

- Copy-on-Write is a mechanism that Docker uses to manage changes to files or data stored in the read-only layers.

- Docker images are made up of multiple read-only layers. Each layer is read-only and represents a snapshot of the file system at a specific point in time.
- Part of an Image: When you build a Docker image (using a Dockerfile), each instruction (like RUN, COPY, etc.) creates a new layer on top of the previous one.
- Immutable(read-only): Once a layer is created, it cannot be changed. Any modifications create a new layer on top of it.This makes the process efficient, as Docker can reuse layers between images.
- Efficient Storage: If multiple images use the same base image or layers, Docker only stores one copy of the shared layers, saving space and speeding up builds.
- Base Image Layer: The lowest layer, which usually includes the operating system (e.g., Ubuntu, Alpine), remains read-only.

### Container Layer (Writable)

- When you run a Docker container, Docker adds a writable layer on top of the image layers.
- Any changes made during the container’s runtime (creating or deleting files) happen in this top writable layer.

- However, when the container is deleted, the writable layer is also removed, meaning all changes in the container are lost unless the data is persisted using volumes or bind mounts.

### How copy-on-Write mechanism works

When you run a container:

- All the files from the three layers are available in the container, but they are read-only.
- Now, let's assume you modify a config file /etc/config which is part of Layer 1 (Base OS).
- 1. Docker copies only /etc/config from the read-only Layer 1 into the writable layer of the container.
- 2. Any subsequent changes to /etc/config happen only in the writable layer.
- 3. The other layers (Layer 2 and Layer 3) remain unchanged and no files from them are copied unless needed.

Diagram Update:

```markdown
## Container's Writable Layer (Only modified files)

/etc/config (modified)

## Read-Only Layers from Image

Layer 3: Custom App (unchanged)
Layer 2: Libraries (unchanged)
Layer 1: Base OS (except /etc/config, which was copied)
```

### Volumes (Persistent Storage)

Volumes are generally recommended for data that needs to persist across container lifecycles,they are portable.

- By default, changes in the writable layer of a container are not persistent, meaning they are lost when the container stops or is removed.

- Managed by Docker: Volumes are created, managed, and stored by Docker, typically in a special location on the host file system (/var/lib/docker/volumes on Linux).

- Named Volumes: You can create and manage volumes with specific names, and these volumes can be shared between multiple containers.

Example of using a volume:

```bash
docker run -v myvolume:/app/data mycontainer

```

### Bind Mounts:

Bind mounts are useful when you need direct access to host files, such as for development environments where you want the container to use files from your local machine.

Example of using a bind mount:

```bash
docker run -v /host/path:/container/path myapp
# This ensures data written to /container/path is persisted on /host/path.
```

Volumes are specifically created and managed by Docker.
Bind mounts directly map to a host directory or file without Docker's management.

### Summary:

- Images are composed of read-only layers.
- Containers add a writable layer on top of the image layers.
- Docker uses UnionFS and a copy-on-write mechanism to efficiently handle file changes.
- Volumes and bind mounts are used for persistent storage beyond the container’s lifespan.

## Basic Commands

### Start container: docker run , docker start

```bash
# Creates and starts a new container from an image.
docker run -d -p 8080:80 --name mysql_latest mysql
# restarts a container that was previously created (and might have stopped)
docker start <container_name_or_id>
```

### Debug CLIs

```bash
# view logs from a running or stopped container , you can use -f to follow the logs in real-time, or --tail to show the last few lines:
docker logs <container_name_or_id>
docker logs -f <container_name_or_id>
docker logs --tail 50 <container_name_or_id>
#  opens a shell inside the container where you can explore the file system
docker exec -it <container_name_or_id> /bin/bash
# check Running Processes
docker exec -it <container_name_or_id> /bin/bash
ps aux
# monitor Resource Usage (CPU, memory, network I/O) for running containers.
docker stats <container_name_or_id>

```
