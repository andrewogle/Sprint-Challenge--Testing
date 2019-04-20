const express = require("express");

const games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/games", async (req, res) => {
  try {
    const videoGames = await games.getAll();
    res.status(200).json(videoGames);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/games", async (req, res) => {
  try {
    const game = await games.insert(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = server;
