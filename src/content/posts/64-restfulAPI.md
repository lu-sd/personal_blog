---
title: "Restful Server in Go"
publishedAt: 2024-11-07
description: "good resources to know when you build web applications and servers in go "
slug: "64-restfulAPI"
isPublish: true
---

## what is REST?

https://www.codecademy.com/article/what-is-rest

REST requires that a client make a request to the server in order to retrieve or modify data on the server. A request generally consists of:

- an HTTP verb(crud), which defines what kind of operation to perform
- a header, which allows the client to pass along information about the request
- a path to a resource
- an optional message body containing data

Processing HTTP requests with Go is primarily about two things: handlers and servemuxes.

If you’re coming from an MVC-background, you can think of handlers as being a bit like controllers. Generally speaking, they're responsible for carrying out your application logic and writing response headers and bodies.

Whereas a servemux (also known as a router) stores a mapping between the predefined URL paths for your application and the corresponding handlers. Usually you have one servemux for your application containing all your routes.

Better Http server routing in Go 1.22 :https://eli.thegreenplace.net/2023/better-http-server-routing-in-go-122

An Introduction to Handlers and Servemuxes in Go:https://www.alexedwards.net/blog/an-introduction-to-handlers-and-servemuxes-in-go

## Server

```go
// File: main.go
package main

import(
  "net/http"
)
//create a Server
server := http.Server{
	Addr:           ":8080",
	Handler:        nil,
  }

// ListenAndServe starts an HTTP server with a given address and handler
server.listenAndServer()
```

The handler is usually nil, which means to use DefaultServeMux. Handle and HandleFunc add handlers to DefaultServeMux:

```go
http.Handle("/foo", fooHandler)

http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
})
```

The handlers that ship with net/http are useful, but most of the time when building a web application you'll want to use your own custom handlers instead. So how do you do that?

The first thing to explain is that anything in Go can be a handler so long as it satisfies the http.Handler interface, which looks like this:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

so we begin to creat our custom handlers:

```go
// File: main.go
package main

import(
  "net/http",
  "fmt",
)

func routes() http.Handler {
// Use the http.NewServeMux() function to create an empty servemux.
mux := http.NewServeMux()
  mux.HandleFunc("GET /path/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "got path\n")
  })

  mux.HandleFunc("/task/{id}/", func(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id")
    fmt.Fprintf(w, "handling task with id=%v\n", id)
  })

  return mux
}
//create a custom Server
server := http.Server{
	Addr:           ":8080",
	Handler:        routes(),
  }

// ListenAndServe starts an HTTP server with a given address and handler
server.listenAndServer()
```

## Add database

After you got a database like sqlite or mysql, you also need a database driver: that will translate requests you make through functions in the database/sql package into requests the database understands.

```go
// add in main.go
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

// The first argument to sql.Open() is the driver name,The second argument is the Data Source Name (DSN), a string that includes the information needed to connect to the database,
db, err := sql.Open("sqlites3", "./app/db")
if err != nil {
	panic(err)
}

```

Query for multiple rows

```go
// could be in a separate file
type Album struct {
    ID     int64
    Title  string
    Artist string
    Price  float32
}

type AlbumModel struct {
  DB *sql.DB
}

func (m *AlbumModel)albumsByArtist(name string) ([]Album, error) {
// An albums slice to hold data from returned rows.
    var albums []Album
// Query’s first parameter is the SQL statement. After the parameter, you can pass zero or more parameters of any type. These provide a place for you to specify the values for parameters in your SQL statement.
    rows, err := db.Query("SELECT * FROM album WHERE artist = ?", name)
    if err != nil {
        return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
    }
    // Defer closing rows so that any resources it holds will be released when the function exits.
    defer rows.Close()
    // Loop through rows, using Scan to assign column data to struct fields.
    for rows.Next() {
        var alb Album
        err := rows.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price)
        if err != nil {
            return nil, err
        }
        albums = append(albums, alb)
    }
    // After the loop, check for an error from the overall query, using rows.Err. Note that if the query itself fails, checking for an error here is the only way to find out that the results are incomplete.
    err = rows.Err()
    if err != nil {
        return nil, err
    }

    return albums, nil
}
```
### ORM
An Object-Relational Mapping or an ORM for short, is a tool that allows you to perform CRUD operations on a database using a traditional programming language. These typically come in the form of a library or framework that you would use in your backend code.

The primary benefit an ORM provides is that it maps your database records to in-memory objects. For example, in Go we might have a struct that we use in our code:
```go
type User struct {
    ID int
    Name string
    IsAdmin bool
}
```
This struct definition conveniently represents a database table called users, and an instance of the struct represents a row in the table.

Example: Using an ORM, we might be able to write simple code like this:

```go
user := User{
    ID: 10,
    Name: "Lane",
    IsAdmin: false,
}
// generates a SQL statement and runs it,
// creating a new record in the users table
db.Create(user)
```
Example: Using straight sql, we might have to do something a bit more manual:
```go
user := User{
    ID: 10,
    Name: "Lane",
    IsAdmin: false,
}

db.Exec("INSERT INTO users (id, name, is_admin) VALUES (?, ?, ?);",
    user.ID, user.Name, user.IsAdmin)
```
## Database migrations and tools

Database migrations are a way to manage changes to your database schema over time in a structured and repeatable way.

Each migration represents a single change, and migrations are applied in sequence to bring a database from an old version to a new one.

- Up Migration: This is the SQL (or code) that applies the change to the database (e.g., adding a new table).
- Down Migration: This is the SQL (or code) that undoes the change if you need to roll back (e.g., dropping the newly added table).

### Example Workflow for Database Migrations With Goose:

1. Create a Migration: A new migration file is created to represent a structural change. This file is typically named with a timestamp and a brief description of the change, such as 20231111120000_add_users_table.sql.

```bash
goose -dir db/migrations create add_users_table sql

```

2. Define Up and Down SQL: Inside the migration file, you’ll define the SQL for both the up (to apply the change) and the down (to revert the change).

3. Apply Migrations: The migration tool runs the up migrations in the order they were created, applying each one to the database to bring it to the latest schema version. It tracks which migrations have been applied in a metadata table (e.g., schema_migrations).

4. Rollback Migrations: If you need to undo a migration, the tool can roll back one or more migrations by running the down commands in reverse order.

### Popular Tools for Database Migrations:

- Goose: A Go-specific migration tool that allows you to write migrations in either SQL or Go code.

- Dbmate: A lightweight, language-agnostic migration tool written in Go but usable across various languages and platforms. It’s especially useful if you work with different stacks since Dbmate uses raw SQL files and has a simpler migration structure.

## Database code generation and tools

Database code generation in Go involves creating boilerplate code for database models, queries, and schema handling automatically.

sqlc is a popular tool that generates type-safe Go code from SQL queries. It is ideal for developers who prefer using raw SQL while still benefiting from the safety and convenience of generated Go code.

Initialize sqlc Configuration: In your project root, create a configuration file named sqlc.yaml:

```yaml
version: "2"
sql:
  - engine: "sqlite"
    queries: "query.sql"
    schema: "schema.sql"
    gen:
      go:
        package: "tutorial"
        out: "tutorial"
```
