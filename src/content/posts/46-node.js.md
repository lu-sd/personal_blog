---
title: "Node.js Tutorial"
publishedAt: 2024-06-16
description: "node built-in modules and related framework"
slug: "46-node.js"
isPublish: true
---

Node.js is a runtime environment that allows you to run JavaScript outside the web browser. It is built on Google Chrome's V8 JavaScript engine. Node.js enables developers to use JavaScript to build server-side applications, backend services, APIs, and even full-stack applications.

## fs and path

A common task for a web server can be to open a file on the server and return the content to the client. Node.js has a set of built-in modules which you can use without any further installation.

The Node.js file system module allows you to work with the file system on your computer.

Common use for the File System module:

Read files
Create files
Update files
Delete files
Rename files

```js
import { fs } from "fs";

fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
```

The path module provides utilities for working with file and directory paths. It is a core module that helps you resolve, manipulate, and format file paths in a way that works across different operating systems. It is crucial for dealing with file systems in Node.js projects.

```js
// Getting the Directory of the Current Module
import { fileURLToPath } from "url";
import { dirname } from "path";

// Convert the `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

console.log(__dirname);
```

When using ES Modules in Node.js, import.meta is a special object in JavaScript that provides metadata about the module in which it is used, import.meta.url provides the URL of the current module file, which is useful for resolving paths relative to the file.

## http module

Node.js can handle HTTP requests by utilizing its built-in http module. This module provides the core functionality needed to create an HTTP server.

When working with the HTTP module, req and res refer to the request and response objects, respectively. These objects are key components of the HTTP server, allowing you to handle incoming requests from clients and send back responses.

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  if (req.url === "/") {
    res.write("Hello, World!");
  } else if (req.url === "/about") {
    res.write("About Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
  }
  // in expresss you don't need end manually.
  res.end();
  // you can also put response body in res.end ("<h1> hello world<h1>")
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

While it is certainly possible to handle HTTP requests using Node.js without Express, doing so requires more manual setup and code. Express abstracts many of these details, making web application development faster and more manageable. However, understanding how to handle HTTP requests directly with Node.js can be beneficial for learning and for situations where you need a minimal or highly customized solution.

```js
const express = require("express");
const app = express();

// Define routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Express.js: can be used with Node.js to handle backend logic and serve APIs or static files. It simplifies handling routes, requests, and responses, making it faster to develop server-side logic.

## URL module

The url module provides utilities for URL resolution, parsing, and formatting.

```js
const { URL } = require("url");

// Creating a URL instance
const myURL = new URL("https://example.com:8000/path/name?query=value#hash");

console.log(myURL.hostname); // Hostname: 'example.com'
console.log(myURL.pathname); // Pathname: '/path/name'
console.log(myURL.search); // Search query: '?query=value'

//The searchParams property allows you to easily manipulate query parameters.
const myURL = new URL("https://example.com?name=john&age=30");
console.log(myURL.searchParams.get("name")); // Output: 'john'

// Adding, deleting, and iterating over search parameters
myURL.searchParams.append("city", "New York");
myURL.searchParams.delete("age");

for (const [key, value] of myURL.searchParams) {
  console.log(`${key}: ${value}`);
}
// Output:
// name: john
// city: New York
```

## .env and process

The .env file used in Node.js and Bash environment variables serve a similar purpose: managing configuration data, but they operate in slightly different ways.

- Bash environment variables affect the entire shell session and all processes started from it, while the .env file in Node.js is localized to the application where it’s used.
- Bash variables take precedence over .env variables if both are defined.
- You can combine both to manage configurations flexibly: using global variables for sensitive information and project-level .env for app-specific settings.

Process is a global object that provides information and control over the current running Node.js process.You can access system or environment variables using process.env. using process.env. This is where you can retrieve values from .env files or environment variables set in the shell.
