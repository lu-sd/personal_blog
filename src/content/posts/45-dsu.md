---
title: "Disjoint Set Union - 721"
publishedAt: 2024-06-06
description: "Disjoint Set Union is also called Union Find because of its two operations - union and find. "
slug: "45-dsu"
isPublish: true
---

DSU stands for "Disjoint Set Union," which is also known as the Union-Find algorithm. It's a data structure that keeps track of a partition of a set into disjoint (non-overlapping) subsets. It's particularly useful for dealing with dynamic connectivity queries, such as determining whether two elements are in the same subset or merging two subsets into one.

The two main operations of the Disjoint Set Union data structure are:

- Find: Determine which subset a particular element is in. This can be used for checking if two elements are in the same subset.
- Union: Join two subsets into a single subset.

721: Accounts Merge

Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

```js
class UnionFind {
    id: Map<string, string>;

    constructor() {
        this.id = new Map();
    }

    find(x: string): string {
        if (!this.id.has(x)) return x;

        let y = this.id.get(x)!;
        if (y !== x) {
            y = this.find(y);
            this.id.set(x, y);
        }
        return y;
    }

    union(x: string, y: string): void {
        this.id.set(this.find(x), this.find(y));
    }
}

function accountsMerge(accounts: string[][]): string[][] {
    const dsu = new UnionFind()
    const userEmails = new Set<string>()

    for (const account of accounts) {
        const [name, ...emails] = account
        let emailP = null
        for (const email of emails) {
            let userEmail = `${name},${email}`
            userEmails.add(userEmail)
            if (emailP === null) {
                emailP = userEmail
            } else {
                dsu.union(emailP, userEmail)
            }
        }
    }

    const group = new Map()
    for(const userEmail of userEmails){
        const ancestor = dsu.find(userEmail)
        if(!group.has(ancestor)){
            group.set(ancestor,[])
        }
        group.get(ancestor).push(userEmail)
    }

    const res = []
    for(const [userEmail,childs] of group){
        const [name,_] = userEmail.split(',')
        const oneEntry = [name]
        for(let child of childs.sort()){
            const [_,email] = child.split(',')
            oneEntry.push(email)
        }
        res.push(oneEntry)
    }

    return res
}
```
