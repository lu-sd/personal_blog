---
title: " Two Pointers using on linked list-82"
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
