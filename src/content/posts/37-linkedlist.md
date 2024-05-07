---
title: " Classic algo on linked list-82,83,19,206,92,25"
publishedAt: 2024-04-27
description: "linked list"
slug: "37-linkedlist"
isPublish: true
---

82:Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

Input: head = [1,1,1,2,3]
Output: [2,3]

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let cur = dummy;

  while (cur.next && cur.next.next) {
    const val = cur.next.val;
    if (cur.next.next.val === val) {
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
}
```

83:Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Input: head = [1,1,2]
Output: [1,2]

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return null;

  let cur = head;

  while (cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return head;
}
```

19:Remove Nth Node From End of List

```js
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let s = dummy;
  let f = dummy;
  while (n > 0) {
    f = f.next;
    n--;
  }
  while (f.next) {
    f = f.next;
    s = s.next;
  }

  s.next = s.next.next;
  return dummy.next;
}
```

206:Given the head of a singly linked list, reverse the list, and return the reversed list.

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

```js
function reverseList(head: ListNode | null): ListNode | null {
  let pre = null;
  let cur = head;

  while (cur) {
    const nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }

  return pre;
}
```

92:Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]

```js
function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  // Create a dummy node to simplify edge cases when reversing near the head
  const dummy = new ListNode(0, head);
  let p0 = dummy; // This will point to the node just before the start of the region to reverse

  // Move p0 to the node just before the 'left' position
  for (let i = 0; i < left - 1; i++) {
    p0 = p0.next; // Advance p0
  }

  // Initialize pointers for the reversal process
  let pre = null; // This will be the new "next" for the node after it gets reversed
  let cur = p0.next; // Start the reversal at the 'left' node

  // Reverse the portion of the list from 'left' to 'right'
  for (let r = 0; r < right - left + 1; r++) {
    const nxt = cur.next; // Temporarily store the next node
    cur.next = pre; // Reverse the current node's pointer
    pre = cur; // Move pre to the current node
    cur = nxt; // Proceed to the next node
  }

  // Connect the reversed sublist back to the main list
  p0.next.next = cur; // Connect the end of the reversed segment to the node after 'right'
  p0.next = pre; // Connect the start of the segment just before 'left' to the start of the reversed segment

  // Return the modified list, excluding the dummy head
  return dummy.next;
}
```

25:Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

```js
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let n = 0; // This will count the total number of nodes in the list
  let curH = head; // Use curH to traverse the list and count nodes
  while (curH) {
    // Traverse the entire linked list to count all nodes
    n++;
    curH = curH.next;
  }

  // Initialize a dummy node to simplify edge cases when reversing at the start of the list
  const dummy = new ListNode(0, head);
  let p0 = dummy; // p0 will act as the node before the start of the group to be reversed
  let pre = null; // Will be used to reverse the links in the list
  let cur = head; // Starts at the head, and will be used to iterate through the list

  while (n >= k) {
    // Only reverse in groups of k if there are at least k nodes left
    n -= k; // Decrement the count of nodes by k as they are processed
    for (let i = 0; i < k; i++) {
      // Loop to reverse k nodes
      const nxt = cur.next; // Store next node
      cur.next = pre; // Reverse current node's pointer
      pre = cur; // Move pre to the current node
      cur = nxt; // Move cur to the next node
    }
    // Before adjusting p0.next, store a temporary pointer to the node before the reversed segment
    const temp = p0.next;
    temp.next = cur; // Connect the end of the reversed group to the rest of the list
    p0.next = pre; // Connect the node before the group to the start of the reversed group
    p0 = temp; // Move p0 to the end of the newly reversed segment
  }

  return dummy.next; // Return the new head, skipping the dummy node
}
```
