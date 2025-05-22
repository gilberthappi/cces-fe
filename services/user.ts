import type { IUser } from "./../types/index";
import httpClient from "./httpClient";

export const getAllUsers = async (): Promise<IUser[]> => {
	return (await httpClient.get("/auth/users")).data.data;
};


export const updateUserRole = async (
	id: string,
): Promise<IUser> => {
	return (await httpClient.put(`/auth/update/${id}`)).data;
};

export const deleteUser = async (id: string): Promise<void> => {
	await httpClient.delete(`/auth/delete/${id}`);
};
