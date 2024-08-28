---
title: "remove duplicates in array and linked list-26,82,83"
publishedAt: 2024-08-28
description: "two pointers implementation and when to use a dummy node"
slug: "58-twoPointerII"
isPublish: true
---

26:Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

```js
function removeDuplicates(nums: number[]): number {
  let l = 0;
  for (let r = 1; r < nums.length; r++) {
    if (nums[l] !== nums[r]) {
      l++;
      nums[l] = nums[r];
    }
  }

  return l + 1;
}
```

83:Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  //s is initialized to point to the current node being processed.
  let s = head;
  // f is initialized to the next node, which will be used to check for duplicates.
  let f = head.next;
  while (f !== null) {
    if (f.val !== s.val) {
      s.next = f;
      s = s.next;
    }
    f = f.next;
  }
  // s.next = null ensures that any remaining part of the list after s is cut off, which might have been part of a duplicate sequence.
  s.next = null;
  return head;
}
```

82:Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  // Create a dummy node to handle edge cases like removing the first node
  let dummy = new ListNode(0, head);

  let prev = dummy;
  let current = head;

  while (current !== null) {
    // Check if the current node has duplicates
    if (current.next !== null && current.val === current.next.val) {
      // Skip all nodes with the current value
      while (current.next !== null && current.val === current.next.val) {
        current = current.next;
      }
      // Link prev to the node after the last duplicate,effectively removing the duplicates from the list.
      prev.next = current.next;
    } else {
      // Move prev pointer forward only if no duplicates were found
      prev = prev.next;
    }
    current = current.next;
  }

  return dummy.next;
}
```
