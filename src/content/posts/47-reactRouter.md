---
title: "React Router"
publishedAt: 2024-06-17
description: "React Router enables client side routing"
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
import JobsPage from ',/pages/JobsPage'
import JobPage from ',/pages/JobPage'
import NotFoundPage from ',/pages/NotFoundPage'

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element ={<HomePage/>}>
      <Route path = '/jobs' element ={<JobsPage/>}>
      <Route path = '/jobs/:id' element ={<JobPage/>}>
      <Route path = '*' element ={<NotFoundPage/>}>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

### Dynamic Segments

If a path segment starts with : then it becomes a "dynamic segment". When the route matches the URL, the dynamic segment will be parsed from the URL and provided as params to other router APIs.

```js
<Route
  // this path will match URLs like
  // - /teams/hotspur
  // - /teams/real
  path="/teams/:teamId"
  // the matching param will be available to the loader
  loader={({ params }) => {
    console.log(params.teamId); // "hotspur"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Team />}
/>;
// and the element through `useParams`
function Team() {
  let params = useParams();
  console.log(params.teamId); // "hotspur"
}
```

### <Link> and <NavLink>

```js
<Link to={`/jobs/${job.id}`} className="...">
  Read More
</Link>
```

A <NavLink> is a special kind of <Link> that knows whether or not it is "active", "pending", or "transitioning". This is useful in a few different scenarios.

```js
import { NavLink } from "react-router-dom";

<NavLink to="/jobs" className={({ isActive }) => (isActive ? "active" : "")}>
  Messages
</NavLink>;
```

### useParams

The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.

```js
import { useParams } from "react-router-dom";

function JobPage() {
  // Get the userId param from the URL.
  const { userId } = useParams();
  // ...
}
```

### useLoaderData

This hook provides the value returned from your route loader.we

if we fetch data use useEffect coming from react like this in JobPage:

```js
import { useParams, useEffect, useState } from "react-router-dom";

function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJOb = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
      } finally {
      }
    };
    fetchJob();
  }, []);

  // ...
}
```

And we can also use useLoaderData:

As the user navigates around the app, the loaders for the next matching branch of routes will be called in parallel and their data made available to components through useLoaderData.

```js
// in JobePage
import { useParams, useLoaderData } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const job = useLoaderData()

  return <h1>{job.title}</h1>
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobaPage as default, jobLoader };


// in App
import JobPage,{jobLoader} from ',/pages/JobPage'
const router = createBrowserRouter(
// Each route can define a "loader" function to provide data to the route element before it renders.
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element ={<HomePage/>}>
      <Route path = '/jobs' element ={<JobsPage/>}>
      <Route path = '/jobs/:id' element ={<JobPage/>} loader = {jobLoader}>
      <Route path = '*' element ={<NotFoundPage/>}>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```
