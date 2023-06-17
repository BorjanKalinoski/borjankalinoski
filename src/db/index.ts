import {
  dbDatabase,
  dbNamespace,
} from '~/db/config';

const {
  default: Surreal,
} = require('surrealdb.js');

export const db = new Surreal('https://borjankalinoski.fly.dev/rpc', {
  db: dbDatabase,
  ns: dbNamespace,
});
