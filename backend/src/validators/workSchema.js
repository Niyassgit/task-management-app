import { z } from "zod";

export const createWorkSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),

    description: z
      .string()
      .min(6, "Description must be at least 6 characters long"),

    overDue: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Valid date is required",
    }),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

    assignee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"),

    status: z.enum(["TO DO", "IN PROGRESS", "COMPLETED", "OVERDUE"]).optional(),
  }),
});


export const updateWorkSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").optional(),

    description: z
      .string()
      .min(6, "Description must be at least 6 characters long").optional(),

    overDue: z.string().refine((date) => !isNaN(Date.parse(date)).optional(), {
      message: "Valid date is required",
    }),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().optional(),

    assignee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID").optional(),

    status: z.enum(["TO DO", "IN PROGRESS", "COMPLETED", "OVERDUE"]).optional(),
  }),
});