const pg = require("pg");
const qq = require("./db/queries.js");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

async function simpleQuery() {
  const new_role_id = 30;
  const employee_id = 24;

  let result = await pool.query(qq.ALL_EMPLOYEES);
  console.log(result.rows);

  //const qstr = `;
  result = await pool.query(qq.UPDATE_EMPLOYEE_ROLE, [
    new_role_id,
    employee_id,
  ]);
  console.log(result.rows);
  result = await pool.query(qq.ALL_EMPLOYEES);
  console.log(result.rows);
}

simpleQuery();
