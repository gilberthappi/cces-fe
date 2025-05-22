import { z } from "zod";

export const CreateAssignSchema = z.object({
    alertId: z.string({ required_error: "Alert required" }).min(1),
    ambulanceId: z.string({ required_error: "Ambulance required" }).min(1),
    hospitalId: z.string({ required_error: "Health Facilty required" }).min(1),
});

