---
title: "Understanding Recursion: Return Values, State Management, and Common Misunderstandings"
publishedAt: 2024-08-16
description: "In this learning note, I want to delved into the critical aspects of recursion, specifically focusing on how to manage return values and state within recursive functions. Using the example of finding the k-th smallest element in a Binary Search Tree (BST)"
slug: "dfsReturn"
isPublish: true
---

283:Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

```js
function kthSmallest(root: TreeNode | null, k: number): number {
  let rank = 0;
  let result = 0;

  function dfs(node: TreeNode | null): void {
    if (node === null) return;

    dfs(node.left);

    rank++;
    if (rank === k) {
      result = node.val;
      return;
    }

    dfs(node.right);
  }

  dfs(root);
  return result;
}
```

This way is to traverse the tree while keeping a global variable ("result") that keeps track of the node'value we have encountered. After the dfs, we return the global variable.

The recursive function dfs does not return any value in this case. We "fire-and-forget" the dfs call.

And then, if you try to solve it by "divide and conquer", Can you code like this?

```js
function kthSmallest(root: TreeNode | null, k: number): number {
  let rank = 0;

  function dfs(node: TreeNode | null): void {
    if (node === null) return;

    dfs(node.left);

    rank++;
    if (rank === k) {
      return node.val;
    }

    dfs(node.right);
  }

  return dfs(root);
}
```

### It return undefined, why?

It's quite common to run into issues like this when dealing with recursion and state management within recursive functions. Let me explain some of the concepts that might help clarify where things can go wrong and why.

- The main issue was that the recursive function dfs was returning a value, but you didn't properly propagate that value back up through the recursive calls. Recursion inherently relies on each function call returning control (and potentially a value) back to the previous call in the stack.

**_Common Misunderstanding:_** It’s easy to think that simply returning a value within a recursive function will automatically handle everything. However, unless you explicitly pass that return value up the chain, it gets lost as soon as that specific recursive call finishes.

- Once you find the k-th smallest element, you want to stop further recursive calls. If you don't handle this correctly, the recursion continues, leading to unnecessary computations.

**_Common Misunderstanding:_** It’s common to think that updating a variable (like rank) in one part of the recursive function will automatically "pause" the recursion. However, recursion will continue unless explicitly stopped or controlled.

### How to Avoid These Mistakes

- Be Explicit with Returns:

  Always ensure that any value you want to propagate through recursive calls is explicitly returned and checked at each level. If you return something from a recursive function, make sure each call checks for it and returns it if necessary.

  In the kthSmallest function, the value of the k-th smallest node is the return value that needs to be passed up from the deepest recursion level where it's found to the original caller.

- Understand the Flow of Recursive Calls:

  Think of the recursive function as a stack of calls.

  Each call must handle the possibility that the answer has already been found and stop further recursion. If the condition you’re looking for is met, return immediately and skip further processing.

### When designing a recursive function, start by asking yourself:

- What do I want to get back (return value) after all recursive calls are done?

  This helps you determine what needs to be returned at each step.

- What information do I need to carry forward as I go deeper into the recursion (state)?

  This helps you decide how to manage variables or information that affect how the recursion behaves.

## When designing a recursive function, you generally need to carefully consider two key aspects:

- **_Return Value:_** Passing Information Up the Call Stack / Passing value up from child to parent

  The return value of a recursive function is what each level of the recursive call stack will pass back up to its caller. This is how information (like the result of a computation) is passed from the "leaf" nodes or base cases up to the root of the recursion.

- **_State Management:_** Passing Information Down the Call Stack / Passing value down from parent to child

  State refers to any variables or information that needs to be maintained or updated as the recursion progresses. This state is usually passed down from parent calls to child calls, allowing each recursive invocation to work with the correct context.

If you prefer to return values directly from the dfs function instead of using a separate result variable, you need to ensure that the value is propagated correctly up the recursive calls. This involves checking the return value after each recursive call and immediately returning it if it's not null.

Here’s how you can do it:

```js
function kthSmallest(root: TreeNode | null, k: number): number {
  let rank = 0;

  function dfs(node: TreeNode | null): number {
    if (node === null) return;

    // Traverse the left subtree
    const left = dfs(node.left);
    if (left !== null) return left; // If found in the left subtree, return immediately

    // Visit the current node
    rank++;
    if (rank === k) return node.val; // If current node is the k-th smallest, return its value

    // Traverse the right subtree
    return dfs(node.right); // If not found, continue to the right subtree
  }

  // The result will be the value returned by the DFS function

  return dfs(root);
}
```
