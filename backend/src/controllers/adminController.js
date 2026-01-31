import User from "../model/userModel.js";
import Work from "../model/workModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found in the system",
      });
    }

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching users",
    });
  }
};

export const getAllWorksForAdmin = async (req, res) => {
  try {
    const works = await Work.find({})
      .populate("assignee", "name email")
      .sort({ createdAt: -1 });

    if (works.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No works found in the system" });
    }
    return res.status(200).json({ success: true, data: works });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching works",
    });
  }
};

export const createWork = async (req, res) => {
  try {
    const { title, description, overDue, assignee, priority } = req.body;
    const work = await Work.create({
      title,
      description,
      overDue,
      assignee,
      priority,
    });

    if (!work) {
      return res.status(400).json({
        success: false,
        message: "Creating new Work has been failed",
      });
    }

    return res
      .status(201)
      .json({ success: true, message: "New Work has been added" });
  } catch (error) {
    console.error("Create work error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while adding new Work",
    });
  }
};

export const updateWork = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, overDue, assignee, priority, status } = req.body;

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

export const deleteWork = async (req, res) => {
  try {
    const { taskId } = req.params;
    const work = await Work.findByIdAndDelete(taskId);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

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
