---
title: "How to deal with height in tailwindCss"
publishedAt: 2023-11-15
description: "Height Algorithms"
slug: "tailwindcss-03"
isPublish: true
---

<mark>Height</mark> tends to look "down" the tree, to determine its size based on the natural size of its contents, while <mark>Width</mark> tends to look "up" the tree, basing its size on the space made available by the parent.

The default "width" behaviour of a block-level element is to fill all the available width, whereas the default "height" behaviour is to be as small as possible while fitting all of the element's content; it's closer to width: min-content than width: auto!

Our section sits inside the `<body>` tag, and so when we set a percentage-based height or min-height, the percentage is based on that parent height. `<body>` doesn't have a specific height set, which means it uses the default behaviour: stay as short as possible, while still containing all the children.

In other words, we have an impossible condition: we're telling the `<section>` to be a percentage of the `<body>`, and the `<body>` wants to base its size off of the `<section>`. They're both looking to each other for guidance.

**_This is really common source of comfusion._** It isn't fixed by Flexbox or Grid, either; those tools help us control the contents of a container, but that container still needs to get its height from somewhere!

Here's how to fix it:

-> Put height: 100% on every element before your main one (including html and body)

-> Put min-height: 100% on that wrapper

-> Don't try and use percentage-based heights within that wrapper
