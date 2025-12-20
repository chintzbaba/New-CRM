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
