---
title: "TailwindCss"
publishedAt: 2025-03-03
description: "some classic design"
slug: "66-tailwindCssCom"
isPublish: true
---
### Creates a hero section with an image background, a dark overlay, and centered text on top:

```js
<div className="relative h-screen">
  <Image
    src="/example.jpg"
    alt="Example"
    // fill: Specific to Next.js Image. Makes the image fill its parent container (requires relative positioning).Best used for Background images.
    fill
    className="object-cover object-center"
    //Next.js-specific prop that makes the image load faster by skipping lazy loading.
    priority
  />
  {/* Dark Overlay ,The absolute inset-0 on the overlay ensures it covers the image fully*/}
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  {/* Centered Text */}
  <div className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">">Some texts on top of image<div/>
</div>
 
```
#### h-full vs h-screen
h-full: Height Relative To Parent container; use case: When you want an element to fill its parent's height.

h-screen:Height Relative To Viewport (screen); use case: When you want an element to take up the whole screen.

#### object-cover,object-center
object-cover: Ensures the image fills the container without distortion (cropping if necessary). Use case:Background images, hero sections.

object-contain:Image fits inside without cropping.Use case:Logos, icons, profile pictures.

object-center: Image crops from the center.Ensuring important content is centered.
### Creates a full-width hero section with a centered overlay and content, making it ideal for landing pages or headers.

```js
<div className="h-[50vh] bg-[url('/images/hero.jpg')] bg-cover bg-center bg-black/55 bg-blend-overlay text-center flex items-center justify-center">
  {/* Content goes here */}
</div>

```
