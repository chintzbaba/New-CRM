const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "laptoBoost.db");
const db = new Database(dbPath);

// Create customers table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL
  )
`).run();

// Create jobs table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    job_date TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    units INTEGER DEFAULT 1,
    service_price REAL DEFAULT 0,
    product_price REAL DEFAULT 0,
    service_cost REAL DEFAULT 0,
    product_cost REAL DEFAULT 0,
    remarks TEXT,
    profit REAL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  )
`).run();

module.exports = db;
