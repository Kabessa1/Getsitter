const sql = require('mssql');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();
  
var mysqlServer;
async function init() {

    // try {
    //     mysqlServer = await sql.connect(sqlConfig);
    //    } catch (err) {
    //     console.log(err);
    //    }
};

module.exports = {init: init, mysqlServer: mysqlServer, sqlConfig: sqlConfig, client:client};