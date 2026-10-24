const express = require("express");
const dotenv = require("dotenv");
const dns = require("dns");

// Load environment variables
dotenv.config();

// Configure DNS BEFORE loading MongoDB/Mongoose
const dnsServers = process.env.MONGO_DNS_SERVERS
  ? process.env.MONGO_DNS_SERVERS.split(",").map((s) => s.trim())
  : ["8.8.8.8", "1.1.1.1"];
dns.setServers(dnsServers);

const connectDB = require("./Config/db");

const app = express();

// Middleware
app.use(express.json());

const clientUrl = process.env.CLIENT_URL;
let corsOptions = {};
if (!clientUrl || clientUrl === "*") {
  corsOptions = { origin: "*" };
} else if (clientUrl.includes(",")) {
  const allowed = clientUrl.split(",").map((s) => s.trim());
  corsOptions = { origin: allowed, credentials: true };
} else {
  corsOptions = { origin: clientUrl, credentials: true };
}
app.use(require("cors")(corsOptions));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Campus Election API is running" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/elections", require("./routes/electionRoutes"));
app.use("/api/candidates", require("./routes/CandidateRoutes"));
app.use("/api/votes", require("./routes/voteRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
