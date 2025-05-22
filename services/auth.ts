import type { roles } from "@/constants/roles";
import type { loginSchema, registerSchema } from "@/constants/login";
import type { z } from "zod";
import axios from "./httpClient";
import httpClient from "./httpClient";

export interface ISignInResponse {
	token: string;
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	name: string;
	photo: string;
	roles: keyof typeof roles;
}
export type TResetPasswordSchema = {
	otp: string;
	email: string;
	newPassword: string;
};

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;

export const signIn = async (data: any): Promise<ISignInResponse | null> => {
	const response = await axios.post("/auth/signin", data);
	const user = response.data.data;

	return {
		token: user.token,
		id: user.id,
		name: `${user.firstName} ${user.lastName}`,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		roles: user.roles[0],
		photo: user.photo,
	};
};

export const registerUser = async (data: FormData): Promise<ISignInResponse | null> => {
	return (await httpClient.post("/auth/signup", data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})).data.data;
};

export const forgot_password = async (data: {
	email: string;
}): Promise<any> => {
	const response = await httpClient.post("/auth/request-password-reset", data);
	return response.data;
};

export const reset_password = async (data: {
	otp: string;
	email: string;
	newPassword: string;
}): Promise<any> => {
	const response = await httpClient.post("/auth/reset-password", data);
	return response.data;
};

export const registerGoogleUser = async (data: {
	token: string;
}): Promise<ISignInResponse> => {
	const response = await httpClient.post("/auth/google-authenticate", data);
	return response.data.data;
};