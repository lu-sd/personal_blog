---
title: "Basic About Ansible"
publishedAt: 2024-09-18
description: "automation tool for Devops"
slug: "62-ansible"
isPublish: true
---

Ansible is an open-source automation tool used for configuration management, application deployment, and task automation. It enables IT administrators to automate repetitive tasks across multiple servers or systems. Ansible operates by using a simple language called YAML to define automation jobs in "playbooks." It doesn’t require installing agents on the target systems, relying instead on SSH or Windows Remote Management (WinRM) for communication.

## Key features of Ansible include:

- Agentless: Unlike other automation tools, Ansible doesn’t require a dedicated agent on the client machines, reducing the maintenance overhead.
- Idempotent(safe to reapply): Tasks will only be performed when there is a change needed, meaning running the same tasks multiple times won’t affect the systems.This ensures that you can repeatedly apply your configurations or tasks, and the system will remain in the desired state without introducing changes or errors due to redundant executions.
- Cross-platform: It can manage Linux, Unix, and Windows systems.
- Scalable: Ansible can be used to automate tasks across a small number of systems or large-scale infrastructure.

## Summary of an Ansible Workflow:

Install and configure Ansible on the control node.
Create an inventory of hosts to manage.
Write playbooks defining tasks to be performed.
Run the playbook on target hosts.
Review output to monitor success and changes.
Handle errors and troubleshoot if necessary.
Modularize with roles for better organization.
Integrate into CI/CD pipelines to automate workflows at scale.

## Playbook

In Ansible, a playbook is a YAML file that contains a series of instructions or "plays" to be executed on remote systems. It defines tasks such as installing software, configuring services, or managing files across a set of machines.

You can think of a playbook as a set of tasks, and each task uses a module to perform specific actions. A playbook groups these tasks together to define a complete workflow or process that you want to automate. Each task in a playbook uses a module to perform a specific function.

In a more structured way:

- Modules: These are individual actions or tools (e.g., install a package, start a service, copy a file). Each task in a playbook uses a module to perform a specific function.
- Tasks: A task calls a module and defines what action should be performed. Each task has a name, uses a module, and provides parameters.
- Playbook: A playbook is a YAML file that groups together multiple tasks (and therefore multiple modules) to automate a series of actions on one or more hosts.

In summary, a playbook = 1 or more Plays,define the full automation workflow, and it orchestrates the execution of tasks (using modules) on specified hosts, which describe:

- how and in which order
- at what time and where
- what(the modules) should be executed

### "At what time"

In Ansible refers to the conditions or events that determine when a task is executed, not real-time scheduling.

You control when tasks run using:

- when statements for conditional logic.
- Handlers that are triggered only when changes occur.
- Retries and delays to repeat tasks until a condition is met.
- Polling with until to wait for a specific result or condition.

In these ways, Ansible manages timing through logic and events, controlling the flow of automation based on system states or conditions.

### module - very granular and specific

A module is a pre-built, reusable piece of code that performs a specific task or action on a managed node.

Modules are at the heart of Ansible automation, enabling you to define specific tasks in your playbooks without needing to write custom scripts for each operation.

```yaml
- name: Install and Configure Apache
  hosts: webservers
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present

    - name: Ensure Apache is started
      service:
        name: apache2
        state: started

    - name: Copy custom configuration
      copy:
        src: /path/to/local/apache2.conf # Ensure the path matches the correct Apache config file
        dest: /etc/apache2/apache2.conf # Update this to match the correct destination path
        owner: root
        group: root
        mode: "0644"
```

In this playbook:

- The apt module installs Apache.
- The service module starts the Apache service.
- The copy module copies a custom configuration file to the server.

### hosts - on which the tasks will be executed

- Inventory files define the hosts and groups.
- Playbooks use the hosts field to target specific machines or groups of machines.
- You can manage hosts dynamically or statically, depending on your infrastructure.
