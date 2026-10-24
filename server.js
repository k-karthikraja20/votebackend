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

// CORS Configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((s) => s.trim())
  : [];

const isOriginAllowed = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) return true;
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return true;
  if (/^https:\/\/.*\.tmp\.now$/.test(origin)) return true;
  return false;
};

app.use(
  require("cors")({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

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
