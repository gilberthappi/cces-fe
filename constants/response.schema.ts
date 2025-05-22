import { MdPhotoCamera } from "react-icons/md";
import { z } from "zod";

export const CreateResponseSchema = z.object({
    subject: z.string({ required_error: "subject required" }).min(3),
    feedbackId: z.string({ required_error: "feedbackId required" }).min(2),
    description: z.string({ required_error: "Description required" }).min(1),
    photo:  z
    .any()
    .optional(),
});
