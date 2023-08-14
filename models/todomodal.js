import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // task: [
    //   {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    //   },
    // ],
  },
  { timestamps: true }
);

const todo = mongoose.model("task", taskSchema);
export default todo;
