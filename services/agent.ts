import { IUser, IOrganization } from "@/types";
import httpClient from "./httpClient";

export const getAgentById = async (id: string): Promise<IUser> => {
	const response = await httpClient.get(`/auth/users/${id}`);
	return response.data.data;
};
export const createAgent = async (data: FormData): Promise<IOrganization> => {
	return (await httpClient.post("/organization/create", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})).data.data;
};

export const updateAgent = async (
	id: string,
	data: FormData,
): Promise<IOrganization> => {
	return (await httpClient.put(`/organization/update/${id}`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})).data.data;
};

export const getOrganizationById = async (id: string): Promise<IUser> => {
	const response = await httpClient.get(`/organization/${id}`);
	return response.data.data;
};

export const deleteAgent = async (id: string): Promise<void> => {
	await httpClient.delete(`/agent/${id}`);
};