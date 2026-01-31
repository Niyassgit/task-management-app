import { api } from "../../services/api";
import { adminEndpoints } from "../../utils/ApiEndpoints";
import type { createTaskType } from "./types";

export const getAllTasks = async () => {
  const res = await api.get(adminEndpoints.getAllWorks);
  return res.data.data;
};
export const getAllUsers = async () => {
  const res = await api.get(adminEndpoints.getAllUsers);
  return res.data.data;
};
export const createTask = async (data: createTaskType) => {
  const res = await api.post(adminEndpoints.CRUDWork, data);
  return res.data.data;
};
export const updateTask = async (taskId: string, data: Partial<createTaskType>) => {
  const res = await api.patch(`${adminEndpoints.CRUDWork}/${taskId}`, data);
  return res.data;
};
export const deleteTask = async (taskId: string) => {
  const res = await api.delete(`${adminEndpoints.CRUDWork}/${taskId}`);
  return res.data;
};
