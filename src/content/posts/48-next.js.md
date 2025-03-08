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

### Why Does Next.js Need Node.js?
Next.js requires Node.js primarily for:

Server-Side Rendering (SSR) & API Routes

When using SSR (getServerSideProps) or API routes (pages/api), the Next.js server dynamically processes requests on the backend.
Node.js acts as the server environment to handle these requests.
Development Server

Running next dev starts a local development server that watches files and rebuilds automatically.
Static Site Generation (SSG) Build Process

When using getStaticProps, Next.js pre-builds static pages at compile time.
Node.js executes this build step.
Middleware & Edge Functions

Custom logic in middleware often runs in a Node.js environment.s

#### Do You Always Need Node.js?
For Development: Yes, you need Node.js to run Next.js locally.
For Deployment:
If using SSR or API routes, you need a Node.js server (e.g., Vercel, AWS Lambda, or a custom Node.js server).
If using SSG (fully static sites), you can deploy without Node.js (e.g., on static hosts like Netlify, Cloudflare Pages).
In summary, Node.js is required for development and SSR but optional for static deployments.

### Why Use <Suspense fallback={null} /> in a Next.js Client-Only App (With Express Backend)?

Even if you only use Next.js as a frontend and handle the backend with Express, you may still need <Suspense> for certain React features, such as:

✅ It reduces the initial JavaScript bundle size (via code splitting).
✅ It enables server-side streaming (faster SSR responses).
✅ It improves hydration performance (progressive hydration).

### useSearchParams() vs URLSearchParams()

Next.js provides the useSearchParams() hook to work with query parameters in client components(?name=John) and useParams() to handle dynamic route segments (/post/:id).Works only in Next.js App Router (app/ directory).Read-only (modifications require router.push())

Use URLSearchParams  is a built-in JavaScript interface using when you need to read or manipulate query parameters in a URL  in a server environment or using JavaScript globally. Handles query parameters (?key=value) in any JavaScript environment (browser, Node.js).Can modify parameters (append, set, delete)

Example: Update Query Parameters (Without Reloading Page)

```js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export default function UpdateQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQuery = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('name', 'Alice');
    newParams.set('age', '28');
    
    router.push(`?${newParams.toString()}`); // Update URL without full reload
  };

  return (
    <div>
      <button onClick={updateQuery}>Update Query Params</button>
    </div>
  );
}

```
Final Takeaway
* URLSearchParams is for general JavaScript use.
* useSearchParams() is a Next.js App Router hook for reading query parameters in React.
* To modify query params in Next.js, use router.push() with URLSearchParams.