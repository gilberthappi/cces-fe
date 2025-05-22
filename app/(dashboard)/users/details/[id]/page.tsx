"use client";
import PageContent from "@/components/shared/PageContent";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { getAgentById } from "@/services/agent";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
const AgentDetailsPage: React.FC = () => {
	const { id } = useParams() as { id: string };
	const { data: agent, isLoading } = useQuery({
		queryKey: ["USER", id],
		queryFn: () => getAgentById(id as string),
	});

	if (isLoading) return <Loader />;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return format(date, "dd MMMM yyyy");
	};

	return (
		<PageContent>
			<Link href="/users">
				<Button variant="ghost">
					<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
				</Button>
			</Link>
			<div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="text-black">
					<section className="mb-8">
						<h2 className="text-xl font-medium mb-3">Profile</h2>
						<img src={agent!.photo} alt="profile" className="w-full h-auto rounded-md" />
					</section>
					{/* <section className="mb-8">
						<h2 className="text-xl font-medium mb-3">Description</h2>
						<p className="text-gray-700 text-sm">
							{agent?.description.replace(/<\/?[^>]+(>|$)/g, "")}
						</p>
					</section>
					<section className="mb-8">
						<h2 className="text-xl font-medium mb-3">About</h2>
						<p className="text-gray-700 text-sm">
							{agent?.about.replace(/<\/?[^>]+(>|$)/g, "")}
						</p>
					</section> */}
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Joined:</strong> {agent?.createdAt ? formatDate(agent.createdAt) : "N/A"}
						</p>
					</div>
				</div>
				<div className="bg-primary text-white rounded-lg p-8 flex-1">
					<div className="mb-4 h-10">
						<h2 className="text-base font-medium">{agent?.firstName} {agent?.lastName}</h2>
					</div>
					<div className="mb-2 h-30">
						<p className="text-sm font-medium">
							<strong>Email:</strong> {agent?.email}
						</p>
					</div>
					
				</div>
			</div>
		</PageContent>
	);
};

export default AgentDetailsPage;
