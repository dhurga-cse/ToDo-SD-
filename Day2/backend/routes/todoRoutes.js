// All the REST API routes for todos live here.
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET /api/todos  -> get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/todos  -> add a new todo
router.post("/", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Please provide a title" });
    }

    try {
        const todo = await Todo.create({ title: title });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /api/todos/:id  -> mark a todo as completed / not completed
router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true }         // return the updated todo
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/todos/:id  -> delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo deleted", id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;