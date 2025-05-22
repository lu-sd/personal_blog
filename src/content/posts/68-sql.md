---
title: "Database and ORM"
publishedAt: 2025-01-03
description: "database"
slug: "68-sql"
isPublish: true
---
### SQL indexes
An index is an in-memory structure that ensures that queries we run on a database are performant, that is to say, they run quickly. Most database indexes are just binary trees or B-trees! The binary tree can be stored in ram as well as on disk, and it makes it easy to lookup the location of an entire row.

#### Why Not Just Use a Hash Table or Array?
Hash indexes are faster for single-key lookups but:

Can’t efficiently support range queries or sorting.

Don’t maintain order of keys.

Arrays (or flat files) would require O(n) for inserts and deletes unless kept unsorted—which breaks indexing.

📍 Tree Structure On Disk vs In RAM
In RAM, binary search trees work well for smaller datasets or in-memory caching.

On disk, B-trees are preferred because disk reads are slow, and B-trees reduce how often they happen.

#### Summary
Databases choose tree structures—especially B-trees/B+ trees—because they:

Keep operations efficient (O(log n))

Are disk-friendly

Support range and sorted queries

Stay balanced automatically, avoiding worst-case time