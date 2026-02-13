const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (uri) {
      const safeUri = uri.replace(/\/\/(.*):/, "//****:"); // hide username
      console.log("Mongo URI:", safeUri);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

module.exports = DbConnection;
