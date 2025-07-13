import knex from 'knex';

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: process.env.DB_PATH,
  },
  useNullAsDefault: true
});

db.on('query', function( queryData ) {
    console.log( queryData );
});
