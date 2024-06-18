---
title: "React Router"
publishedAt: 2024-06-17
description: "React Router enables "client side routing"."
slug: "47-reactRouter"
isPublish: true
---

React Router is a standard library for routing in React applications. It enables navigation among different views or components in a React application, allowing developers to build single-page applications (SPAs) with navigation capabilities similar to traditional multi-page websites.

Client side routing allows your app to update the URL from a link click without making another request for another document from the server. Instead, your app can immediately render some new UI and make data requests with fetch to update the page with new information.

## Setup

npm install react-router-dom

## Adding a router

```js
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  // [
  //  {
  //   path: "/",
  //   element: <HomePage />,
  //  },
  // ]
  createRoutesFromElements(<Route path="/" element={<HomePage />} />)
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

### <Outlet>

An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.

```js
import { Outlet } from "react-router-dom";
import Navbar from '../componets/Navbar'
const MainLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </Navbar>
  );
};
```

## Add different pages

```js
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Mainlayout from './layouts/MainLayout'
import HomePage from ',/pages/HomePage'
import JobPage from ',/pages/JobPage'
import NotFoundPage from ',/pages/NotFoundPage'

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element ={<HomePage/>}>
      <Route path = 'jobs' element ={<JobPage/>}>
      <Route path = '*' element ={<NotFoundPage/>}>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

### <NavLink>

A <NavLink> is a special kind of <Link> that knows whether or not it is "active", "pending", or "transitioning". This is useful in a few different scenarios.

```js
import { NavLink } from "react-router-dom";

<NavLink to="/jobs" className={({ isActive }) => (isActive ? "active" : "")}>
  Messages
</NavLink>;
```
