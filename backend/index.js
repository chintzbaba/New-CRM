const db = require("./db/database");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });

});

/* GET /customers endpoint using SQLite database */
app.get("/customers", (req, res) => {
  const customers = db.prepare("SELECT * FROM customers").all();
  res.json(customers);
});

//* GET /jobs endpoint using SQLite database */
app.get("/jobs", (req, res) => {
  const jobs = db.prepare(`
    SELECT jobs.*, customers.name AS customer_name
    FROM jobs
    JOIN customers ON jobs.customer_id = customers.id
    ORDER BY job_date DESC
  `).all();

  res.json(jobs);
});

//* POST /jobs endpoint using SQLite database */
app.post("/jobs", (req, res) => {
  const {
    customer_id,
    job_date,
    category,
    description,
    units,
    service_price,
    product_price,
    service_cost,
    product_cost,
    remarks,
    profit,
  } = req.body;

  if (!customer_id || !job_date || !category || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = db.prepare(`
    INSERT INTO jobs (
      customer_id, job_date, category, description,
      units, service_price, product_price,
      service_cost, product_cost, remarks, profit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    customer_id,
    job_date,
    category,
    description,
    units || 1,
    service_price || 0,
    product_price || 0,
    service_cost || 0,
    product_cost || 0,
    remarks || "",
    profit || 0
  );

  const newJob = db
    .prepare("SELECT * FROM jobs WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newJob);
});


/*
GET /customers endpoint is temporarily disabled to avoid confusion with in-memory data store

app.get("/customers", (req, res) => {
  res.json(customers);
});*/

///* POST /customers endpoint using SQLite database */

app.post("/customers", (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = db
    .prepare(
      "INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)"
    )
    .run(name, phone, email);

  const newCustomer = db
    .prepare("SELECT * FROM customers WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newCustomer);
});

/* POST /customers is temporarily disabled to avoid confusion with in-memory data store

app.post("/customers", (req, res) => {
  console.log("POST /customers body:", req.body);
  const { name, phone, email } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newCustomer = {
    id: Date.now(),
    name,
    phone,
    email,
  };

  customers.push(newCustomer);

  console.log("Customers after insert:", customers);

  res.status(201).json(newCustomer);
}); */

///* DELETE /customers endpoint using SQLite database */

app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id);

  const result = db
    .prepare("DELETE FROM customers WHERE id = ?")
    .run(id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(204).send();
});


/* DELETE /customers is temporarily disabled to avoid confusion with in-memory data store
app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id);

  const initialLength = customers.length;
  customers = customers.filter((c) => c.id !== id);

  if (customers.length === initialLength) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(204).send();
}); */


/* PUT /customers endpoint using SQLite database */
app.put("/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, phone, email } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = db
    .prepare(
      "UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?"
    )
    .run(name, phone, email, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const updatedCustomer = db
    .prepare("SELECT * FROM customers WHERE id = ?")
    .get(id);

  res.json(updatedCustomer);
});


/*
app.put("/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, phone, email } = req.body;

  if (!name || !phone ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Customer not found" });
  }

  customers[index] = {
    ...customers[index],
    name,
    phone,
    email,
  };

  res.json(customers[index]);
});
*/

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});







/* Temporary in-memory data store and local persistent storage replacement

let customers = [
  {
    id: 1,
    name: "Test Customer",
    phone: "9999999999",
    email: "test@example.com",
  },
];

 */
