export const roles = {
	ADMIN: "ADMIN",
	ORGANIZATION: "ORGANIZATION",
	CITIZEN: "CITIZEN"
};

export type IRole = keyof typeof roles;
