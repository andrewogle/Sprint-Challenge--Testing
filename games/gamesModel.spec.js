const VideoGames = require("./gamesModel.js");
const db = require("../data/dbConfig.js");

describe("the games model", () => {
  beforeEach(() => {
    return db("videoGames").truncate();
  });
  describe("the insert fn", () => {
    it("should insert a game to the database", async () => {
      await VideoGames.insert({
        title: "halo",
        genre: "shooter",
        releaseYear: 2000
      });
      const games = await db("videoGames");
      expect(games.length).toBe(1);
      expect(games[0].title).toBe("halo");
    });
    it("should return the inserted game with id", async () => {
      const game = await VideoGames.insert({
        title: "halo",
        genre: "shooter",
        releaseYear: 2000
      });

      expect(game.id).toBe(1);
      expect(game.title).toBe("halo");
      expect(game.genre).toBe("shooter");
      expect(game.releaseYear).toBe(2000);
    });
  });
  describe("the get all fn", () => {
    beforeEach(() => {
      return db("videoGames").truncate();
    });
    it("should return all the games in the db", async () => {
      await db("videoGames").insert([
        {
          title: "halo",
          genre: "shooter",
          releaseYear: 2000
        }
      ]);
      const games = await VideoGames.getAll();
      expect(games.length).toBe(1);
      expect(games[0].title).toBe("halo");
      expect(games[0].genre).toBe("shooter");
      expect(games[0].releaseYear).toBe(2000);
    });
  });
});
