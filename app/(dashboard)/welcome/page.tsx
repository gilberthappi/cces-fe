"use client";
import PageContent from "@/components/shared/PageContent";
import React from "react";

const WelcomPage = () => {
	return (
		<PageContent>
			<div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
				{/* Heading Section */}
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
		<span className="text-primary">CITIZEN COMPLAINTS AND ENGAGEMENT SYSTEM</span>
				</h1>

				{/* Subtitle Section */}
				<p className="text-lg sm:text-xl md:text-2xl text-center text-gray-400 mb-8 max-w-3xl">
					Your one-stop platform for submitting and tracking complaints, and engaging with the community.
				</p>
			</div>
		</PageContent>
	);
};

export default WelcomPage;
