import { Request, Response } from "express";
import User from "../model/userModel";
import Work from "../model/workModel";
import { io } from "../server";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: "USER" }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching users",
    });
  }
};

export const getAllWorksForAdmin = async (req: Request, res: Response) => {
  try {
    const works = await Work.find({})
      .populate("assignee", "name email")
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: works });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching works",
    });
  }
};

export const createWork = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { title, description, overDue, assignee, priority } = req.body;
    const now = new Date();
    const dueDate = new Date(overDue);

    if (isNaN(dueDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date",
      });
    }
    if (dueDate <= now) {
      return res.status(400).json({
        success: false,
        message: "OverDue date must be a future date",
      });
    }

    const work = await Work.create({
      title,
      description,
      overDue,
      assignee,
      priority,
      assignedBy: req.user.userId,
    });

    io.to(assignee.toString()).emit("work:created", work);
    if (!work) {
      return res.status(400).json({
        success: false,
        message: "Creating new Work has been failed",
      });
    }

    return res
      .status(201)
      .json({ success: true, message: "New Work has been added", data: work });
  } catch (error) {
    console.error("Create work error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding new Work",
    });
  }
};

export const updateWork = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description, overDue, assignee, priority, status } =
      req.body;

    const work = await Work.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        overDue,
        assignee,
        priority,
        status,
      },
      { new: true, runValidators: true },
    );

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    io.to(assignee.toString()).emit("work:updated", work);

    return res.status(200).json({
      success: true,
      message: "Task has been updated successfully",
      data: work,
    });
  } catch (error) {
    console.error("Update work error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while updating Task",
    });
  }
};

export const deleteWork = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const work = await Work.findByIdAndDelete(taskId);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    io.to(work.assignee.toString()).emit("work:deleted", work.id);
    return res.status(200).json({
      success: true,
      message: "Task has been deleted successfully",
    });
  } catch (error) {
    console.error("Delete work error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while deleting Task",
    });
  }
};
