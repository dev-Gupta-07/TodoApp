const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });

    try {
      res.status(200).json({
        message: "Get all todos successfully.",
        todos: todos,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: "Get a todo successfully.",
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createATodo = async (req, res) => {
    try{

    
  const {owner,title,description,completed,createdAt} = req.body;
  const newTodo=await Todo.create({
    owner,
    title,
    description,
    completed,
    createdAt
  })
  
    if (!newTodo) {
      res.status(500).json({
        message: "Cannot create a todo",
      });
    } else {
      res.status(201).json({
        message: "Create a new todo successfully.",
      });
    }
}
catch(error)
    {
      res.status(500).json({ error: error.message });
    }

  };



const updateATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        msg: `Todo with id: ${todoId} updated successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteATodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.status(404).json({ msg: `No todo with id: ${todoId}` });
    } else {
      res.status(200).json({
        message: `Todo with id: ${todoId} deleted successfully.`,
        todo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={getAllTodos,getATodo,createATodo,updateATodo,deleteATodo};