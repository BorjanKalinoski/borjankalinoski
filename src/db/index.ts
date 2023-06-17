import {
  dbDatabase,
  dbNamespace,
} from '~/db/config';

const {
  default: Surreal,
} = require('surrealdb.js');

export const db = new Surreal('http://127.0.0.1:8000/rpc', {
  db: dbDatabase,
  ns: dbNamespace,
});
