/* eslint-disable no-mixed-spaces-and-tabs */
"use client";
import ConfirmationModal from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { IoMdMore } from "react-icons/io";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css";
import { H3 } from "@/components/shared/Heading";
import PageContent from "@/components/shared/PageContent";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { getAllUsers, deleteUser } from "@/services/user";


const UserPages = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["USER"],
		queryFn: getAllUsers,
		gcTime: 0,
	});
	const queryClient = useQueryClient();
	const [showModal, setShowModal] = useState<boolean>(false);
		const [deleteId, setDeleteId] = useState<string | null>(null);
		const { toast } = useToast();
		const [currentPage, setCurrentPage] = useState(1);
		const [filter, setFilter] = useState("ALL");
		const [sort, setSort] = useState("Default");
		const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
		const userPerPage = 9;
		const filters = ["ALL", "ORGANIZATION", "CITIZEN"];
		const sorts = ["Default", "Latest", "Oldest"];
		const deleteMutation = useMutation({
			mutationFn: (id: string) => deleteUser(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["USER"] });
				toast({ title: "User deleted", variant: "primary" });
			},
			onError: () => {
				toast({
					title: "User has many activity, cannot be delete",
					variant: "destructive",
				});
			},
		});
	
		function handleDeleteClick(id: string) {
			setDeleteId(id);
			setShowModal(true);
		}
	
		function handleConfirmDelete() {
			if (deleteId) {
				deleteMutation.mutate(deleteId);
				setShowModal(false);
			}
		}
	
	const filteredUser = data?.filter(
		(prop) => filter === "ALL" || prop.roles[0].role === filter
	) || [];
	const sortedUsers = (filteredUser ?? []).sort((a, b) => {
		if (sort === "Latest")
		  return (
			new Date(b.createdAt || 0).getTime() -
			new Date(a.createdAt|| 0).getTime()
		  );
		if (sort === "Oldest")
		  return (
			new Date(a.createdAt || 0).getTime() -
			new Date(b.createdAt || 0).getTime()
		  );
		return 0;
	  });
	  const indexOfLastUser = currentPage * userPerPage;
	  const indexOfFirstUser = indexOfLastUser - userPerPage;
	  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
	
	  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownOpen && !(event.target as HTMLElement).closest(".dropdown-menu")) {
				setDropdownOpen(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownOpen]);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	return (
		<PageContent>
		<div className="flex justify-between items-center">
			<H3>USERS</H3>
			<Button asChild className="mb-4">
				<Link href="/users/create">CREATE</Link>
			</Button>
			</div>
	<div className="flex justify-between items-center">
			<div className="flex items-center gap-4">
				<div className="flex items-center">
					{filters.map((item) => (
						<button
							key={item}
							className={`cursor-pointer text-lg font-medium rounded px-2 py-1 ${
								filter === item ? "bg-white text-primary" : ""
							}`}
							onClick={() => setFilter(item)}
						>
							{item}
						</button>
					))}
				</div>
				<select
            className="p-2 text-base rounded shadow-sm hover:bg-fourth inline"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            {sorts.map((s) => (
              <option 
                className="hover:bg-fourth hover:text-black" 
                key={s}
                style={{ backgroundColor: 'white' }}
              >
                {s}
              </option>
            ))}
          </select>
			</div>
		</div>
		<div className="flex flex-col bg-white rounded shadow-sm">
{/* Table Header - Hidden on mobile */}
<div className="hidden sm:grid p-4 items-center border-b bg-secondary mt-4 border-gray-200 grid-cols-[17%_30%_20%_25%_8%]">
<h2 className="text-base font-semibold text-white capitalize">IMAGE</h2>
<h2 className="text-base font-semibold text-white capitalize">INFO</h2>
<h2 className="text-base font-semibold text-white capitalize">ROLE</h2>
<h2 className="text-base font-semibold text-white capitalize">CREATED_AT</h2>
<h2 className="text-base font-semibold text-white capitalize mr-4">ACTION</h2>
</div>
			{isLoading
				? Array.from({ length: userPerPage }).map((_, index) => (
						<Skeleton key={index} height={50} />
				))
				: currentUsers.map((prop) => (
						<div
						className="grid p-4 items-center border-b border-gray-200 
						grid-cols-1 sm:grid-cols-[17%_30%_20%_25%_8%]  
						bg-white transition duration-800 ease-in-out hover:bg-fourth relative"
							key={prop.id}
						>
							<div className="absolute top-2 right-2 sm:hidden">
								<button
									className="cursor-pointer text-xl p-1 rounded shadow-sm bg-transparent"
									onClick={() => setDropdownOpen(dropdownOpen === String(prop.id) ? null : String(prop.id))}
								>
									<IoMdMore />
								</button>
								{dropdownOpen === String(prop.id) && (
									<div className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded shadow-sm z-10 dropdown-menu">
												<>
													<Link
														href={`/users/details/${prop.id}`}
														className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
													>
														<AiOutlineEye />
														<span>View</span>
													</Link>
												</>
											<button
												className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
												onClick={() => handleDeleteClick(String(prop.id))}
											>
												<AiOutlineDelete />
												<span>Delete</span>
											</button>
									</div>
								)}
							</div>
							<div className="w-100 h-24 overflow-hidden rounded sm:w-150 sm:h-34">
								<img
									src={
										prop.photo ||
										'https://calhum.org/wp-content/uploads/2022/07/placeholder-4-1.png'
									}
									alt={prop.firstName}
									width={500}
									height={500}
									style={{width: "100px", height: "80px"}}
								/>
							</div>
								<div className="flex flex-col">
									<h3 className="text-base font-semibold text-gray-800 truncate">{prop.firstName} {prop.lastName}</h3>
									<div className="flex text-sm font-light items-center gap-1">
										<span className="text-sm font-medium text-gray-400">{prop.email}</span>
									</div>
								</div>
								<div className="text-sm font-medium text-gray-600">{prop.roles[0].role}</div>
								<div className="text-sm font-medium text-gray-600">{formatDate(prop.createdAt)}</div>
								<div className="relative hidden sm:block">
									<button
										className="cursor-pointer text-xl p-1 rounded shadow-sm bg-transparent"
										onClick={() =>
											setDropdownOpen(dropdownOpen === String(prop.id) ? null : String(prop.id))
										}
									>
										<IoMdMore />
									</button>
									{dropdownOpen === String(prop.id) && (
										<div className="absolute bg-white rounded shadow-sm z-10 dropdown-menu">
												<>
													<Link
														href={`/users/details/${prop.id}`}
														className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
													>
														<AiOutlineEye />
														<span>View</span>
													</Link>
												</>
											<button
												className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
												onClick={() => handleDeleteClick(String(prop.id))}
											>
												<AiOutlineDelete />
												<span>Delete</span>
											</button>
										</div>
									)}
								</div>
							</div>
					))}
			</div>
			<div className="flex mt-8 justify-center gap-2">
				<button
					className={`p-2 flex items-center cursor-pointer bg-gray-300 rounded ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
					onClick={() => paginate(currentPage - 1)}
					disabled={currentPage === 1}
				>
					<MdNavigateBefore />
				</button>
				{[...Array(Math.ceil(sortedUsers.length / userPerPage)).keys()].map(
					(num) => (
						<button
							key={num}
							className={`p-2 flex items-center cursor-pointer bg-gray-300 rounded ${currentPage === num + 1 ? "bg-primary text-white" : ""}`}
							onClick={() => paginate(num + 1)}
						>
							{num + 1}
						</button>
					)
				)}
				<button
					className={`p-2 flex items-center cursor-pointer bg-gray-300 rounded ${currentPage === Math.ceil(sortedUsers.length / userPerPage) ? "cursor-not-allowed" : ""}`}
					onClick={() => paginate(currentPage + 1)}
					disabled={
						currentPage === Math.ceil(sortedUsers.length / userPerPage)
					}
				>
					<MdNavigateNext />
				</button>
			</div>
			<ConfirmationModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleConfirmDelete}
				message="Are you sure you want to delete this User?"
			/>
		</PageContent>
	);
}


export default UserPages;
