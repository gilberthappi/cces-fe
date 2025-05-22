import { withAuth } from "next-auth/middleware";

export default withAuth({
	callbacks: {
		authorized: ({ token }) => !!token,
	},
});

export const config = {
	matcher: [
		"/",
		"/users",
		"/settings",
		"/welcome",
		"/backhome",
		"/properties",
		"/bookings",
		"/contact",
		"/faq",
        "/blog",
	],
};
