import { getOrgStatisticCount, getStatisticCount } from "@/services/stats";
import { useEffect, useState } from "react";

export const useAdminStats = (year: string) => {
	const [statisticCounts, setStatisticCounts] = useState<any>({
		organizationCountByMonth: [],
		citizenCountByMonth: [],
		feedbackCountByMonth: [],
	});

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedStatisticCounts = await getStatisticCount(year);
				setStatisticCounts(fetchedStatisticCounts.data);
			} catch (error) {
				console.error("Error fetching admin stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		statisticCounts,
	};
};


export const useOrgStats = (year: string) => {
	const [statisticCounts, setStatisticCounts] = useState<any>({
		answeredFeedbackCountByMonth: [],
		pendingFeedbackCountByMonth: [],
		feedbackCountByMonth: [],
	});

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedStatisticCounts = await getOrgStatisticCount(year);
				setStatisticCounts(fetchedStatisticCounts.data);
			} catch (error) {
				console.error("Error fetching admin stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		statisticCounts,
	};
};
