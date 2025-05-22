"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
	useEffect(() => {
		signOut({ callbackUrl: "/" });
	}, []);

	return null;
};

export default LogoutPage;
