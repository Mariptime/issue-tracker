import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Must include a Title (String)').max(255),
    description: z.string().min(1, 'Must include a Description (String)').max(255)
});