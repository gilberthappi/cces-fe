import httpClient from "./httpClient";

export const getStatisticCount = async (year: string): Promise<any> => {
	return (await httpClient.get(`/statistic/admin/${year}`)).data;
};

export const getOrgStatisticCount = async (year: string): Promise<any> => {
	return (await httpClient.get(`/statistic/organization/${year}/current`)).data;
};