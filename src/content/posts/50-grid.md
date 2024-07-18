---
title: "Tailwinds css layout practise"
publishedAt: 2024-07-15
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

### Flexbox or Grid: Which Should You Use?

Flexbox is more content-driven, while Grid is more layout-driven.

Flexbox excels in flexible, responsive designs, while Grid is better for complex, precise layouts.

Flexbox is more content-driven, meaning it adjusts the layout based on the size of the items within the container,which means intrinsic size.

Grid really excels in a rigid or structured layout from the parent.

Sometimes, you may need to use both Flexbox and Grid together. For example, you might use Grid to define the overall page structure and then use Flexbox within individual components for their internal layout. This allows you to leverage the strengths of both layout models.
