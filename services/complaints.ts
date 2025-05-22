import type { IFeedback, IFeedbackResponseItem } from "../types/index";
import httpClient from "./httpClient";

export const getAllComplaints = async (): Promise<IFeedback[]> => {
    return (await httpClient.get("/feedback/organization")).data.data;
};


export const createResponse = async (data: FormData): Promise<IFeedbackResponseItem> => {
    return (await httpClient.post("/response", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })).data.data;
};

export const updateResponse = async (
    id: string,
    data: FormData,
): Promise<IFeedbackResponseItem> => {
    return (await httpClient.put(`/response/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })).data.data;
};

export const cancelComplaint= async (id: string): Promise<void> => {
    await httpClient.put(`/feedback/${id}/cancel`);
};

export const getComplaint = async (id: string): Promise<IFeedback> => {
    const response = await httpClient.get(`/feedback/${id}`);
    return response.data.data;
};