"use client";
import {  useOrgStats } from "@/services/useAdminStats";
import type React from "react";
import { useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	BarChart,
	Bar,
} from "recharts";

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

const OrganizationDashboard = () => {
	const currentYear = new Date().getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear.toString());
	const { statisticCounts } =
		useOrgStats(selectedYear);

	// Prepare data for the chart
	const data = monthNames.map((month, index) => ({
		month,
		pendingFeedbackCountByMonth: statisticCounts.pendingFeedbackCountByMonth?.[index] || 0,
		answeredFeedbackCountByMonth: statisticCounts.answeredFeedbackCountByMonth?.[index] || 0,
		feedbackCountByMonth: statisticCounts.feedbackCountByMonth?.[index] || 0,
	}));

	// Year selection handler
	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(e.target.value);
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
			<div className="flex-1 flex justify-between items-center">
					<div className="group flex flex-col items-center bg-white py-8 px-12 sm:py-12 sm:px-12 mr-2 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-primary">
						<h1 className="font-bold text-xl sm:text-2xl text-gray-900 group-hover:text-white">
								{statisticCounts.pendingFeedbackCountByMonth.reduce(
										(a: number, b: number) => (Number(a) || 0) + (Number(b) || 0),
										0,
									) || 0}
						</h1>
						<p className="text-xs sm:text-sm text-gray-800 group-hover:text-white">
							Pending Complaint
						</p>
					</div>
					<div className="group flex flex-col items-center bg-white py-8 px-12 sm:py-12 sm:px-12 mr-2 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-primary">
						<h1 className="font-bold text-xl sm:text-2xl text-gray-900 group-hover:text-white">
								{statisticCounts.answeredFeedbackCountByMonth.reduce(
										(a: number, b: number) => (Number(a) || 0) + (Number(b) || 0),
										0,
									) || 0}
						</h1>
						<p className="text-xs sm:text-sm text-gray-800 group-hover:text-white">
							Answered Complaint 
						</p>
					</div>
					<div className="group flex flex-col items-center bg-white py-8 px-8 sm:py-12 sm:px-12 lg:px-24 rounded-md hover:shadow-md transition-all duration-75 w-full flex-1 hover:bg-primary">
						<h1 className="font-bold text-xl sm:text-2xl text-gray-900 group-hover:text-white">
									{statisticCounts.feedbackCountByMonth.reduce(
										(a: number, b: number) => (Number(a) || 0) + (Number(b) || 0),
										0,
									) || 0}
						</h1>
						<p className="text-xs sm:text-sm text-gray-800 group-hover:text-white">
							Compliants
						</p>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-md p-4 shadow-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Monthly Statistics</h2>
					<select
						value={selectedYear}
						onChange={handleYearChange}
						className="p-2 border rounded-md ml-4"
					>
						{/* Generate options for the last 5 years */}
						{[...Array(5)].map((_, index) => {
							const year = currentYear - index;
							return (
								<option key={year} value={year.toString()}>
									{year}
								</option>
							);
						})}
					</select>
				</div>
				</div>
		<div className="flex flex-col lg:flex-row gap-4">
		
			<div className="bg-white rounded-md p-4 shadow-md flex-1">
				<h2 className="text-xl font-semibold mb-4">Pending Complaint</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="pendingFeedbackCountByMonth" stroke="#82ca9d" name="Pending Complaint" />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className="bg-white rounded-md p-4 shadow-md flex-1">
				<h2 className="text-xl font-semibold mb-4">Complaints and Citizen</h2>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="answeredFeedbackCountByMonth" fill="#cdbd8e" name="Answered Complaint" />
						<Bar dataKey="feedbackCountByMonth" fill="RGB(138, 144, 154)" name="Compliants" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
		</div>
	);
};

export default OrganizationDashboard;
