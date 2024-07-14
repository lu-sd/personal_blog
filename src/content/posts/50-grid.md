---
title: "Tailwinds css layout practise"
publishedAt: 2024-06-27
description: "using different way to great a grid layout"
slug: "50-grid"
isPublish: true
---

```js
// use -margin
 <TabsContent className="flex flex-wrap -mx-2 " value="summary">
    <ContentCard className="w-full px-2 mb-4" title="full" />
    <ContentCard className="w-1/2 px-2 mb-4" title="half" />
    <ContentCard className="w-1/2 px-2 mb-4" title="test3" />

//  use flex wrap and magic number

 <TabsContent className="flex flex-wrap justify-between gap-4" value="summary">
    <ContentCard className="flex-[0_1_100%] " title="test1" />
    <ContentCard className="flex-[0_1_49%] " title="test2" />
    <ContentCard className="flex-[0_1_49%]" title="test3" />

// use grid
<TabsContent className="grid grid-cols-2 gap-4" value="summary">
    <ContentCard className="col-span-2" title="test3" />
    <ContentCard  title="test3" />
    <ContentCard  title="test3" />
```
