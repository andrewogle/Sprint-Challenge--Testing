// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/videoGames.sqlite3'
    },
    useNullAsDefault: true,
    migrations:{directory: './data/migrations',},
    seeds:{
      directory:'./data/seeds',
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/videoGames.sqlite3'
    },
    useNullAsDefault: true,
    migrations:{directory: './data/migrations',},
    seeds:{
      directory:'./data/seeds',
    }
  },
};
