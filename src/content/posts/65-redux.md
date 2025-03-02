---
title: "Redux"
publishedAt: 2024-03-01
description: "Redux,React Reduxt and Redux Toolkit "
slug: "65-reudx"
isPublish: true
---
Redux is a library for managing global application state
* Redux is typically used with the React-Redux library for integrating Redux and React together
* Redux Toolkit is the standard way to write Redux logic

Redux's update pattern separates "what happened" from "how the state changes"
* Actions are plain objects with a type field, and describe "what happened" in the app
* Reducers are functions that calculate a new state value based on previous state + an action
* A Redux store runs the root reducer whenever an action is dispatched

Redux Toolkit(RTK) includes utilities that help simplify many common use cases, including store setup, creating reducers and writing immutable update logic, and even creating entire "slices" of state at once.

### Basic Example

createSlice is a function in Redux Toolkit (@reduxjs/toolkit) that simplifies creating Redux state slices, including: ✅ State → Defines the initial state.
✅ Reducers → Defines how the state is updated.
✅ Actions → Auto-generates action creators based on reducers.

```js
import { createSlice, configureStore } from '@reduxjs/toolkit'
// 1. Creating a Slice
const counterSlice = createSlice({
  name: 'global',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      // Uses Immer under the hood, allowing mutable syntax (state.count += 1).
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})

// Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called actions. Then you write a special function called a reducer to decide how every action transforms the entire application's state.
export const { incremented, decremented } = counterSlice.actions
export default counterSlice.reducer

// 2. Adding the Slice to Redux Store
const store = configureStore({
  reducer: counterSlice.reducer
})

```
If you use Redux toolkit query, the store may need combine reuducer to manage global + API state efficiently.

✅ Use combineReducers() to manage both Redux UI state (state.global) and API state (state.api).
✅ Without api.reducer, Redux won't store API responses, making caching and re-fetching impossible.
✅ Now, If you use the Redux DevTools extension, you’ll see:

* state.global → Normal Redux slice state.
* state.api → Cached API data.
* state.api.queries → Stores loading/error states.

,helping with debugging.

```js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api"; // RTK Query API slice
import globalReducer from "./globalSlice"; // Global state slice

const rootReducer = combineReducers({
  global: globalReducer, // ✅ Global state stored in state.global
  [api.reducerPath]: api.reducer, // ✅ API state stored in state.api
});

const store = configureStore({
  reducer: rootReducer
})
```
So in RTK query you need add "reducerPath: "api" " in createApi()
```js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api", // ✅ Stores state in `state.api`
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
  }),
});

export const { useGetCoursesQuery } = api;

```
If you're using RTK Query in an Express app (server-side) or any environment without Redux store, RTK Query will still work as a data fetching tool, like fetch() (no caching, no auto-refresh). but:

❌ No caching – Every request will hit the API (no saved responses).
❌ No automatic re-fetching – API calls won’t automatically refresh on state changes.
❌ No DevTools support – API responses won't be stored in Redux DevTools.

✅ Still works for making API requests.