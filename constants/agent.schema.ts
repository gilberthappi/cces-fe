import { z } from "zod";

export const CreateAgentSchema = z.object({
    name: z.string({ required_error: "Name required" }).min(1),
    category: z.string({ required_error: "Category required" }).min(1),
    address: z.string({ required_error: "Address required" }).min(1),
    tags: z.array(z.string()),
    user: z.object({
        firstName: z.string({ required_error: "FirstName required" }).min(3),
        lastName: z.string({ required_error: "LastName required" }).min(2),
        password: z.string({ required_error: "Password required" }).min(2),
        email: z.string({ required_error: "Email required" }).email(),
        phoneNumber: z.string({ required_error: "Phone number required" }).min(1),
        photo: z.any().optional(),
        role: z.string({ required_error: "Role required" }).min(1),
    }),
});

