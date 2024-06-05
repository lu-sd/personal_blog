---
title: "Topological sorting(Kahn's Algorithm) -207"
publishedAt: 2024-06-04
description: "A topological order (or topological sorting) of a directed graph is a linear ordering "
slug: "44-topologicalSorting"
isPublish: true
---

This kind of ordering is possible if and only if the graph has no directed cycles, i.e., the graph is a Directed Acyclic Graph (DAG).

Applications of Topological Sorting:

- Task Scheduling: When certain tasks must be performed before others, topological sorting helps determine a valid order of tasks.
- Course Prerequisites: Given courses and their prerequisites, topological sorting can determine a valid order to take the courses.
- Compilation Order: When compiling code, certain files must be compiled before others due to dependencies.

207: There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

```js
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Initialize the graph as an adjacency list
    const graph = new Map<number, number[]>();
    for (let course = 0; course < numCourses; course++) {
        graph.set(course, []);
    }

    // Build the graph from prerequisites
    for (let [child, parent] of prerequisites) {
        graph.get(parent).push(child);
    }

    // Initialize in-degree for each course
    const inDegree = new Map<number, number>();
    for (let course = 0; course < numCourses; course++) {
        inDegree.set(course, 0);
    }

    // Calculate in-degrees
    for (let course = 0; course < numCourses; course++) {
        for (const child of graph.get(course)) {
            inDegree.set(child, inDegree.get(child) + 1);
        }
    }

    // Initialize queue with courses having in-degree of 0
    const queue: number[] = [];
    for (const [course, degree] of inDegree) {
        if (degree === 0) {
            queue.push(course);
        }
    }

    // Process nodes with BFS
    let processedCourses = 0;
    while (queue.length > 0) {
        const course = queue.shift();
        processedCourses++;
        for (const child of graph.get(course)) {
            inDegree.set(child, inDegree.get(child) - 1);
            if (inDegree.get(child) === 0) {
                queue.push(child);
            }
        }
    }

    // Check if all courses are processed
    return processedCourses === numCourses;
}

```

or you can simplify code like this:

```js
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const parent_graph = new Map<number, number[]>()
    const inDegree = new Map<number, number>()

    for (let i = 0; i < numCourses; i++) {
        inDegree.set(i, 0)
        parent_graph.set(i, [])
    }

    for (const [child, parent] of prerequisites) {
        inDegree.set(child, inDegree.get(child) + 1)
        parent_graph.get(parent).push(child)
    }

    const que: number[] = []
    for (const [key, val] of inDegree) {
        if (val === 0) {
            que.push(key)
        }
    }
    let res = 0
    while (que.length) {
        const cur_parent = que.pop()
        res++
        for (const child of parent_graph.get(cur_parent)) {
            inDegree.set(child, inDegree.get(child) - 1)
            if (inDegree.get(child) === 0) {
                que.push(child)
            }
        }
    }
    return res === numCourses
};
```
