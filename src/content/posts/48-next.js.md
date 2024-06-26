---
title: "notebook when learning next.js"
publishedAt: 2024-06-25
description: "React Router enables "client side routing"."
slug: "48-next.js"
isPublish: true
---

There are four ways to navigate between routes in Next.js:

- Using the <Link> Component
- Using the useRouter hook (Client Components)
- Using the redirect function (Server Components)
- Using the native History API

### <Link> Component

<Link> is a built-in component that extends the HTML <a> tag to provide prefetching and client-side navigation between routes. It is the primary and recommended way to navigate between routes in Next.js.

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
