"use client";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

export const queryCLient = new QueryClient();

const Provider = ({ children }: PropsWithChildren) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryCLient}>
				{children}
				<Toaster />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Provider;
