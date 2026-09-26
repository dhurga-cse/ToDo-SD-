// This is the shape of one todo in MongoDB.
// Mongoose uses it to create the "todos" collection automatically.
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true          // a todo must always have a title
    },
    completed: {
        type: Boolean,
        default: false         // new todos start as not completed
    },
    createdAt: {
        type: Date,
        default: Date.now      // stores when the todo was created
    }
});

module.exports = mongoose.model("Todo", todoSchema);