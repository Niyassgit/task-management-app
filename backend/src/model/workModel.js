import mongoose from "mongoose";

const { Schema } = mongoose;

const workModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    overDue: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
      default: "MEDIUM",
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["TO_DO", "IN_PROGRESS", "COMPLETED", "OVERDUE"],
      default: "TO_DO",
    },
  },
  { timestamps: true },
);

const Work = mongoose.model("Work", workModel);

export default Work;
