import cron from "node-cron";
import Work from "../model/workModel";
import { io } from "../server";

export const startCronJobs = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            const overdueWorks = await Work.find({
                overDue: { $lt: now },
                status: { $nin: ["COMPLETED", "OVERDUE"] }
            });

            if (overdueWorks.length > 0) {
                console.log(` Cron: Found ${overdueWorks.length} tasks to mark as OVERDUE`);

                for (const work of overdueWorks) {
                    work.status = "OVERDUE";
                    await work.save();
                    io.to(work.assignee.toString()).emit("work:updated", work);

                    if (work.assignedBy) {
                        io.to(work.assignedBy.toString()).emit("work:updated", work);
                    }
                }
            }
        } catch (error) {
            console.error("🔴 Cron Job Error:", error);
        }
    });

    console.log("⏰ Cron jobs started: checking for overdue tasks...");
};
