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
