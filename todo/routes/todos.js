// routes/todos.js

const express = require("express");
const router = express.Router();

// CRUD -> Create, Read, Update, Delete

// Mock data
let todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build RESTful API", completed: false },
  { id: 3, title: "Create Todo App", completed: true },
  { id: 4, title: "Lista Noua", completed: false },
];

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// GET a specific todo by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// POST a new todo
router.post("/", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    res.status("400").json({ message: "missing required title field" });
  }

  const newTodo = { id: todos.length + 1, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1)
    return res.status(404).json({ message: "Todo not found" });
  todos[todoIndex] = { id: parseInt(id), title, completed };
  res.json(todos[todoIndex]);
});

// DELETE a todo by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1)
    return res.status(404).json({ message: "Todo not found" });
  todos.splice(todoIndex, 1);
  res.sendStatus(204);
});

module.exports = router;
