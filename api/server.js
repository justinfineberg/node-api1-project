// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const Model = require("./users/model");

server.use(express.json());

server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const newUser = await Model.insert({ name, bio });
      res.status(201).json(newUser);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await Model.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await Model.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await Model.remove(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updatedUser = await Model.update(req.params.id, { name, bio });
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
