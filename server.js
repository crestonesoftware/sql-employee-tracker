const pg = require("pg");
const qq = require("./db/queries.js");
const CLI = require("./lib/interactions.js");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

async function simpleQuery() {
  let result = await pool.query(qq.ALL_EMPLOYEES);
  console.log(result.rows);
}

function init() {
  CLI.promptUser();
}

init();
