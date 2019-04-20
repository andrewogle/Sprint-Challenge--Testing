const server = require("./server.js");
const db = require('../data/dbConfig.js');
const request = require("supertest");


describe("get /", () => {
  it("should return status 200", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
  });

  it("should return JSON", async () => {
    const res = await request(server).get('/');

    expect(res.type).toBe('application/json')
  });
  it("should return {api: 'up'}", async () => {
    const res = await request(server).get('/');

    expect(res.body).toEqual({api:"up"})
  });
});
describe('get /games',()=>{
    beforeEach(() => {
        return db("videoGames").truncate();
      });
    it('should return status 200', async ()=>{
        const res = await request(server).get("/games");

    expect(res.status).toBe(200);
    });
    it("should return JSON", async () => {
        const res = await request(server).get('/games');
    
        expect(res.type).toBe('application/json')
      });
    it('should return an empty array when there are no games', async ()=>{
        const res = await request(server).get('/games');

        expect(res.body).toEqual([]);
    });
    it("should return all the games in the db", async () => {
        await db("videoGames").insert([
          {
            title: "halo",
            genre: "shooter",
            releaseYear: 2000
          },{
            title: "PacMan",
            genre: "Arcade",
            releaseYear: 1980
          }
        ]);
        const res = await request(server).get('/games');
        const data = res.body
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(data.length).toEqual(2);
        
      });

     
});
describe('post /games', ()=>{
    beforeEach(() => {
        return db("videoGames").truncate();
      });
      it('should return status 422 when info is incomplete', async ()=>{
        const game = {}
        const res = await request(server).post('/games').send(game)

        expect(res.status).toBe(422)
  })
  it('should return status code 201', async () => {
    const game = { title: 'tekken', genre: 'fighting', releaseYear:1999 }
    const res = await request(server).post('/games').send(game)

    expect(res.status).toBe(201)
})
it('should return JSON', async () => {
    const game = {
        title: "PacMan",
        genre: "Arcade",
        releaseYear: 1980
      }
    const res = await request(server).post('/games').send(game)

    expect(res.type).toBe('application/json')
})
});