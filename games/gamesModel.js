const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  
  getAll,

};

async function insert(hobbit) {
  const [id] = await db('videoGames').insert(hobbit);

  return db('videoGames').where({id}).first();
}

function getAll() {
  return db('videoGames');
}

