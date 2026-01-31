import { api } from "../../services/api";
import { userEndpoints } from "../../utils/ApiEndpoints";

export const getUserTasks = async () => {
    const res = await api.get(userEndpoints.getWorks);
    return res.data.data;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
    const res = await api.patch(`${userEndpoints.updateStatus}/${taskId}`, { status });
    return res.data;
};
