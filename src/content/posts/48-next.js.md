---
title: "Notebook when I am learning next.js"
publishedAt: 2024-06-25
description: "Key points for review"
slug: "48-next.js"
isPublish: true
---

There are four ways to navigate between routes in Next.js:

- Using the `<Link>` Component
- Using the useRouter hook (Client Components)
- Using the redirect function (Server Components)
- Using the native History API

### `<Link>` Component

`<Link>` is a built-in component that extends the HTML `<a>` tag to provide prefetching and client-side navigation between routes. It is the primary and recommended way to navigate between routes in Next.js.

You can use usePathname()to determine if a link is active. For example, to add a class to the active link, you can check if the current pathname matches the href of the link:

```js
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function Links() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === "/about" ? "active" : ""}`}
            href="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
```

### useRouter() Hook

```js
"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push("/dashboard")}>
      Dashboard
    </button>
  );
}
```

By default, Next.js uses Server Components. This allows you to automatically implement server rendering with no additional configuration, and you can opt into using Client Components when needed.

In Next.js, the rendering work is further split by route segments to enable streaming and partial rendering, and there are three different server rendering strategies:

- Static Rendering

- Dynamic Rendering

### Dynamic Functions

Dynamic functions rely on information that can only be known at request time such as a user's cookies, current requests headers, or the URL's search params. In Next.js, these dynamic functions are:

- cookies() and headers(): Using these in a Server Component will opt the whole route into dynamic rendering at request time.
- searchParams: Using the searchParams prop on a Page will opt the page into dynamic rendering at request time.
