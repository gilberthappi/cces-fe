"use client";
import type { IRole } from "@/constants/roles";
import { TokenPayload } from "@/constants/types";
import { useSession } from "next-auth/react";
import React, { type PropsWithChildren, type FC } from "react";

interface CmpGuardProps extends PropsWithChildren {
	roles: IRole[];
}
const CmpGuard: FC<CmpGuardProps> = ({ children, roles }) => {
	const { status, data } = useSession();

	if (status === "loading") return null;

	if (status !== "authenticated") return null;

	const payloadData = data as unknown as TokenPayload;
	const hasRequiredRoles = roles.some((role) =>
		payloadData.user.roles.includes(role)
	);

	if (!hasRequiredRoles) return null;

	return <>{children}</>;
};

export default CmpGuard;
