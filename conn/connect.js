import mongoose from "mongoose";

// Connection URL
const url = "mongodb://127.0.0.1:27017/noteapp";

// Connect to MongoDB
const connectToDb = async () => {
  await mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
      // Perform database operations here
      // ...
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectToDb;
