const config = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url:
      'mongodb://localhost:27017/' || 'mongodb+srv://volkovmaks2100:M27112002v@cluster0.gofqkhu.mongodb.net/vtormall',

    // TODO Change this to your database name:
    databaseName: 'productDB',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },

  // The migrations dir can be a relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The MongoDB collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
  moduleSystem: 'esm',
};

export default config;
