import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWork extends Document {
  title: string;
  description: string;
  overDue: Date;
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignee: Types.ObjectId;
  assignedBy: Types.ObjectId;
  status: "TO_DO" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";
  createdAt: Date;
  updatedAt: Date;
}

const workSchema = new Schema<IWork>(
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
    assignedBy: {
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

const Work = mongoose.model<IWork>("Work", workSchema);

export default Work;
