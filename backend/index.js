const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running" });

});

app.get("/customers", (req, res) => {
  res.json(customers);
});

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
});

app.delete("/customers/:id", (req, res) => {
  const id = Number(req.params.id);

  const initialLength = customers.length;
  customers = customers.filter((c) => c.id !== id);

  if (customers.length === initialLength) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.status(204).send();
});

app.put("/customers/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
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


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

let customers = [
  {
    id: 1,
    name: "Test Customer",
    phone: "9999999999",
    email: "test@example.com",
  },
];
