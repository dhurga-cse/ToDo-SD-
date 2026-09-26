# Day 2 - Full Stack Todo Application (HTML, CSS, JavaScript + Node.js/Express + MongoDB)

Day 1 was a simple Todo app that only used the browser.
Day 2 turns it into a **full stack** app: the frontend talks to a backend over
REST APIs, and the data is stored in **MongoDB** instead of disappearing when you
refresh the page.

## Folder structure

```
TodoApplication/
├── Day1/            (the original simple version - untouched)
└── Day2/
    ├── frontend/
    │   ├── todo.html
    │   ├── todo.css
    │   └── todo.js
    ├── backend/
    │   ├── server.js
    │   ├── package.json
    │   ├── models/
    │   │   └── Todo.js
    │   └── routes/
    │       └── todoRoutes.js
    └── README.md
```

## Features

- Add a todo
- View all todos
- Mark a todo as completed (click on the task text)
- Delete a todo
- Todos are saved in MongoDB (they stay after you close the browser)
- Frontend and backend are connected with REST APIs

## How to run (step by step)

### 1. Install Node.js

Download and install the LTS version from https://nodejs.org
Check it works by opening a terminal and typing:

```
node -v
npm -v
```

### 2. Install and run MongoDB

- **Windows**: install the MongoDB Community Server, or use
  [MongoDB Atlas](https://www.mongodb.com/atlas) (a free cloud database).
- After installing locally, MongoDB should be running as a service.
  The default local address is `mongodb://127.0.0.1:27017`.

> If you use MongoDB Atlas instead, open
> `Day2/backend/server.js` and replace the `DB_URL` line with the connection
> string Atlas gives you (something like
> `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/todoApp`).

### 3. Install the backend packages

Open a terminal **inside the `Day2/backend` folder** and run:

```
npm install
```

This creates the `node_modules` folder (it may take a minute).

### 4. Start the backend server

Still inside `Day2/backend`:

```
npm start
```

You should see:

```
Connected to MongoDB
Server is running at http://localhost:5000
```

Keep this terminal open - the backend must stay running.

### 5. Start the frontend

Open the file `Day2/frontend/todo.html` in your browser by double-clicking it.

That's it. The page loads the todos from the database, and every button calls the
backend.

**Option B (recommended for testing later):** while the server is running, also open
<http://localhost:5000> in your browser. The backend serves the same frontend files.

## The REST API

| Method   | URL               | What it does                  | Body sent              |
| -------- | ----------------- | ----------------------------- | ---------------------- |
| `GET`    | `/api/todos`      | Get all todos                 | -                      |
| `POST`   | `/api/todos`      | Add a new todo                | `{"title":"My task"}`  |
| `PUT`    | `/api/todos/:id`  | Mark completed / not completed| `{"completed":true}`    |
| `DELETE` | `/api/todos/:id`  | Delete a todo                 | -                      |

` :id ` is the id of a todo, for example `665f1c2a9b1e4c0012ab34cd`.

## How the code fits together

1. `backend/server.js` - starts the server, connects to MongoDB, loads the routes,
   and serves the frontend files.
2. `backend/models/Todo.js` - defines what a todo looks like in the database
   (`title`, `completed`, `createdAt`).
3. `backend/routes/todoRoutes.js` - the four API endpoints (add, view, update,
   delete).
4. `frontend/todo.js` - uses `fetch()` to call the API and update the page.
5. `frontend/todo.css` / `frontend/todo.html` - the same look as Day 1, plus a
   small message line for errors.

## Common problems

- **"Could not connect to MongoDB"** - MongoDB is not running. Start the MongoDB
  service, or check your connection string in `server.js`.
- **"Error: Failed to fetch" in the browser** - the backend is not running.
  Start it with `npm start` inside `Day2/backend`.
- **Port already in use** - change `const PORT = 5000;` in `server.js` and also
  change `API_URL` at the top of `frontend/todo.js` to the same new port.

## What is different from Day 1?

| Day 1                          | Day 2                                   |
| ------------------------------ | --------------------------------------- |
| Runs only in the browser       | Frontend + backend                      |
| Data lost on refresh           | Data stored in MongoDB                  |
| `addTask()` only edits the DOM | `addTask()` calls a REST API            |
| No server needed               | Needs `npm install` and `npm start`     |
