---
title: "Node.js Tutorial"
publishedAt: 2024-06-16
description: "node built-in modules"
slug: "46-node.js"
isPublish: true
---

Node.js uses asynchronous programming!

A common task for a web server can be to open a file on the server and return the content to the client.Node.js has a set of built-in modules which you can use without any further installation.

Consider modules to be the same as JavaScript libraries.
A set of functions you want to include in your application.

## Node.js File System

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

## Node.js http module

Node.js can handle HTTP requests by utilizing its built-in http module. This module provides the core functionality needed to create an HTTP server.

```js
const http = require('http');
const server = http.createServer((req, res) => {
    const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (req.url === '/') {
        res.write('Hello, World!');
    } else if (req.url === '/about') {
        res.write('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
    }

    res.end();
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

## URL module

```js
var url = require("url");
var adr = "http://localhost:8080/default.htm?year=2017&month=february";
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'
```
