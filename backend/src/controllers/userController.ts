import { Request, Response } from "express";
import Work from "../model/workModel";
import { io } from "../server";

export const getAllWorks = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { userId } = req.user;
        const works = await Work.find({ assignee: userId })
            .populate("assignedBy", "name email workRole")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: works,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching works",
        });
    }
};

export const updateWorkStatus = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { userId } = req.user;
        const { taskId } = req.params;
        const { status } = req.body;

        const work = await Work.findOneAndUpdate(
            { _id: taskId, assignee: userId },
            { status },
            { new: true, runValidators: true },
        );

        if (!work) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        io.to(work.assignedBy.toString()).emit("work:updated", work);

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: work,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating task status",
        });
    }
};
