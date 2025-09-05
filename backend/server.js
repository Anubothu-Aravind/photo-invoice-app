const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require("./Routes/userRoutes");
const clientRoutes = require("./Routes/clientRoutes");
const serviceTypeRoutes = require("./Routes/serviceTypeRoutes");
const businessSettingRoutes = require("./Routes/businessSettingRoutes");
const invoiceRoutes = require("./Routes/invoiceRoutes");

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/servicetypes", serviceTypeRoutes);
app.use("/api/business-settings", businessSettingRoutes);
app.use("/api/invoices", invoiceRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Photo Invoice API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler (✅ FIXED — no "*")
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
