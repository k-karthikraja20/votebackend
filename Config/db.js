const dns = require("dns");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    dns.setServers(["8.8.8.8"]);

    console.log("Mongo URI exists:", !!process.env.MONGO_URI);
    console.log("Testing MongoDB DNS...");

    dns.resolveSrv(
      "_mongodb._tcp.cluster0.yxagnvs.mongodb.net",
      (err, records) => {
        if (err) {
          console.error("DNS ERROR:", err);
        } else {
          console.log("DNS SUCCESS:", records);
        }
      }
    );

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB ERROR:", error);
    throw error;
  }
};

module.exports = connectDB;
