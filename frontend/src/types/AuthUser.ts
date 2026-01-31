import type { Role } from "./Role";

export interface AuthUser {
    userId: string;
    role: Role;
    name?: string;
    workRole?: string;
}