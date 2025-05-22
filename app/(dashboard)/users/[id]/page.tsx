"use client";
import CreateAgentForm from "@/components/agent/CreateagentForm";
import Loader from "@/components/ui/Loader";
import { getOrganizationById } from "@/services/agent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditAgentPage = () => {
	const params = useParams();
	const id = params!.id as string;
	const { data, isLoading } = useQuery({
		queryKey: ["USER", id],
		queryFn: () => getOrganizationById(id),
	});

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<CreateAgentForm isLoading={isLoading} isUpdate defaults={data} />
			)}
		</div>
	);
};

export default EditAgentPage;
