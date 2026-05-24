const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://127.0.0.1:27017/ElectronicsInventoryDB"
);

const ProductSchema = new mongoose.Schema(
  {},
  { strict: false }
);

const SalesSchema = new mongoose.Schema(
  {},
  { strict: false }
);

const Product = mongoose.model(
  "Product",
  ProductSchema,
  "products"
);

const Sale = mongoose.model(
  "Sale",
  SalesSchema,
  "sales"
);

app.get("/products", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

app.get("/sales", async (req, res) => {
  const data = await Sale.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});