const pg = require("pg");

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

async function simpleQuery() {
  
  const selectAllEmployees = "select * from public.employee";
  const result = await pool.query(selectAllEmployees);
  console.log(result.rows);
}
simpleQuery();
