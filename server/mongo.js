const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://adminn:adminn123@cluster0.7eucdjx.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", userSchema);

const problemSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const problemCollection = mongoose.model("problemCollection", problemSchema);

module.exports = {
  collection,
  problemCollection,
};
