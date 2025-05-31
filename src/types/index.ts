export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  aiUsedAt?: string | null;
}

export type UserRole = "admin" | "viewer";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export const ModalMode = {
  CREATE: "create",
  EDIT: "edit",
  PREVIEW: "preview",
} as const;

export type ModalMode = (typeof ModalMode)[keyof typeof ModalMode];
