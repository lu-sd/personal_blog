---
title: " Classic algo on linked list-203,82,83,19,206,234,92,25,707,142,143"
publishedAt: 2024-04-27
description: "linked list"
slug: "37-linkedlist"
isPublish: true
---

203:Remove Linked List Elements
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

```js
function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let pre = dummy;
  let cur = head;

  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
    } else {
      pre = pre.next;
    }
    cur = cur.next;
  }
  return dummy.next;
}
```

83:Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Input: head = [1,1,2]
Output: [1,2]

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let pre = dummy;
  let cur = head;

  while (cur) {
    if (cur.next && cur.val === cur.next.val) {
      pre.next = cur.next;
    } else {
      pre = pre.next;
    }
    cur = cur.next;
  }

  return dummy.next;
}
```

If the linked list is not sorted, we can use a set

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
     const dummy = new ListNode(0, head)
     let pre = dummy
     let cur = head
     const record = new Set<number>()

     while(cur){
        if(record.has(cur.val)){
            pre.next = cur.next
        }else{
            pre = pre.next
            record.add(cur.val)
        }
        cur = cur.next
     }
    return dummy.next
};
```

82:Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

Input: head = [1,1,1,2,3]
Output: [2,3]

```js
function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy; // `prev` is a safe guard for linking nodes that are not duplicates.
  let cur = head;
  while (cur) {
    // Check if current node is a start of duplicates.
    if (cur.next && cur.val === cur.next.val) {
      // Skip all nodes with the same value.
      while (cur.next && cur.val === cur.next.val) {
        cur = cur.next;
      }
      // Link `prev.next` to the node after the last duplicate.
      prev.next = cur.next;
    } else {
      // No duplicates, safely move `prev`.
      prev = prev.next;
    }
    // Move `cur` forward.
    cur = cur.next;
  }

  return dummy.next; // The head of the modified list.
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
// iterative
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
// recursive
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}
```

234:Given the head of a singly linked list, return true if it is a palindrome or false otherwise

1. Use the slow and fast pointer.
   This approach runs in O(n) time and uses O(1) extra space.

```js
function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return true;
  }

  // Step 1: Find the middle of the linked list
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (fast !== null) {
    slow = slow.next;
  }
  // Step 2: Reverse the linked list from slow
  let left = head;
  let right = reverse(slow);

  function reverse(node: ListNode) {
    let pre = null;
    let cur = node;
    while (cur !== null) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    return pre;
  }
  // Step 3: Compare the two halves
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}
```

2. Use a recursive approach
   This approach runs in O(n) time ,and space Complexity: O(n) (due to the call stack in the recursion)

```js
function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return true;
  }

  let pre = null;
  let cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
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

707:Design a linked list

```js
class LNode {
  value: number;
  next: LNode | null;
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}
class MyLinkedList {
  head: LNode | null = null;
  tail: LNode | null = null;
  size: number = 0;
  constructor() {}

  getNode(index: number) {
    let cur = this.head;

    while (index--) {
      cur = cur.next;
    }

    return cur;
  }

  get(index: number): number {
    if (index >= this.size) {
      return -1;
    }
    return this.getNode(index).value;
  }

  addAtHead(val: number): void {
    const node = new LNode(val, this.head);
    this.head = node;
    this.size++;
    if (this.tail == null) {
      this.tail = node;
    }
  }

  addAtTail(val: number): void {
    if (this.head == null) {
      this.addAtHead(val);
      return;
    }
    const node = new LNode(val);
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index > this.size) return;

    if (index == 0) {
      this.addAtHead(val);
      return;
    }

    if (index == this.size) {
      this.addAtTail(val);
      return;
    }

    const pre = this.getNode(index - 1);
    const node = new LNode(val, pre.next);
    pre.next = node;
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index >= this.size) return;

    if (index == 0) {
      this.head = this.head.next;
      this.size--;
      if (this.size == 0) {
        this.tail == null;
      }
      return;
    }

    const pre = this.getNode(index - 1);
    if (index == this.size - 1) {
      this.tail = pre;
    }
    pre.next = pre.next.next;
    this.size--;
  }
}
```

142:Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

```js
function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      while (slow !== head) {
        slow = slow.next;
        head = head.next;
      }
      return slow;
    }
  }
  return null;
}
```

143:Reorder List

```js
function reorderList(head: ListNode | null): void {
  function midNode(head) {
    let s = head;
    let f = head;
    while (f && f.next) {
      f = f.next.next;
      s = s.next;
    }
    return s;
  }

  function reverse(head) {
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

  const mid = midNode(head);
  let head2 = reverse(mid);

  while (head2.next !== null) {
    const nxt = head.next;
    const nxt2 = head2.next;
    head.next = head2;
    head2.next = nxt;
    head = nxt;
    head2 = nxt2;
  }
}
```
