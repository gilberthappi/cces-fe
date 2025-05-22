"use client";
import { useState, useEffect } from "react";
import PageContent from "@/components/shared/PageContent";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { H3 } from "@/components/shared/Heading";
import { getAllComplaints, cancelComplaint } from "@/services/complaints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineStop, AiOutlineComment } from "react-icons/ai";
import { StarIcon} from "@heroicons/react/24/solid";
import { IoMdMore } from "react-icons/io";
import ConfirmationModal from "@/components/ui/ConfirmDialog2";

const ComplaintsList = () => {
    const { toast } = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("ALL");
    const [sort, setSort] = useState("Default");
    const filters = ["ALL"];
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const sorts = ["Default", "Latest", "Oldest"];
    const queryClient = useQueryClient();
      const [showModal, setShowModal] = useState<boolean>(false);
        const [cancelId, setCancelId] = useState<string | null>(null);
      const { data, isLoading } = useQuery({
        queryKey: ["COMPLAINTS"],
        queryFn: getAllComplaints,
        gcTime: 0,
      });

          const cancelMutation = useMutation({
            mutationFn: (id: string) => cancelComplaint(id),
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["COMPLAINTS"] });
              toast({ title: "Complaints cancelled", variant: "primary" });
            },
            onError: () => {
              toast({
                title: "Failed to Cancel Complaints",
                variant: "destructive",
              });
            },
          });
        
          function handleCancelClick(id: string) {
            setCancelId(id);
            setShowModal(true);
          }
        
          function handleConfirmCancel() {
            if (cancelId) {
              cancelMutation.mutate(cancelId);
              setShowModal(false);
            }
          }

      const filteredComplaints = data?.filter(
        (prop) => filter === "ALL" || prop.category=== filter
      ) || [];
    
      const complaintsPerPage = 9;
    
      const sortedComplaints = (filteredComplaints ?? []).sort((a, b) => {
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
        const indexOfLastComplaints = currentPage * complaintsPerPage;
        const indexOfFirstComplaints = indexOfLastComplaints - complaintsPerPage;
        const currentComplaints = sortedComplaints.slice(indexOfFirstComplaints, indexOfLastComplaints);
      
        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
      
        useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
            if (
              dropdownOpen &&
              !(event.target as HTMLElement).closest(".dropdown-menu, .dropdown-button, .relative")
            ) {
              setDropdownOpen(null);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [dropdownOpen]);
	return (
		<PageContent>
        <div className="flex justify-between items-center">
          <H3>COMPLAINTS LIST</H3>
            
           </div>
           <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
        <div className="relative">
  <button
    className="p-2 text-base rounded shadow-sm bg-white border cursor-pointer"
    onClick={() => setDropdownOpen(dropdownOpen === "filter" ? null : "filter")}
  >
    {filter}
  </button>
  {dropdownOpen === "filter" && (
    <div className="absolute mt-2 bg-white border rounded shadow-lg z-50">
      {filters.map((item) => (
        <button
          key={item}
          className={`block w-full text-left px-4 py-2 text-sm ${
            filter === item ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => {
            setFilter(item);
            setDropdownOpen(null);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {isLoading
                ? Array.from({ length: complaintsPerPage }).map((_, index) => (
                    <div className="blog skeleton" key={index}>
                      <Skeleton height={150} />
                      <Skeleton width={"80%"} />
                      <Skeleton count={2} />
                    </div>
                  ))
                : currentComplaints.map((com, index) => (
                  <div className="relative block bg-white border rounded shadow-sm overflow-hidden" key={index}>
                    <div className="h-48 overflow-hidden">
                      <img src={com.galleryImages[0]} alt={com.category} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 title={com.category} className="text-base font-semibold truncate">
                        {com.category}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 truncate">{com.ticket}</p>
                      <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          {com.feedbackStatus==="RESOLVED" ? (
                            <StarIcon className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <StarIcon className="w-5 h-5 text-gray-400" />
                          )}
                          {com.feedbackStatus}
                        </span>
                        <span className="flex items-center gap-1">
                        {com.responseStatus}
                        </span>
                        
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        className="dropdown-button cursor-pointer text-xl p-1 rounded shadow-sm bg-primary"
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === String(com.id) ? null : String(com.id))
                        }
                      >
                        <IoMdMore />
                      </button>
                      {dropdownOpen === String(com.id) && (
                        <div className="dropdown-menu absolute right-0 mt-2 bg-white rounded shadow-lg z-50 w-20">
                          <Link
                            href={`/complaints/details/${com.id}`}
                            className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
                          >
                            <AiOutlineComment />
                            <span>Respond</span>
                          </Link>
                          <button
                            className="w-full text-sm p-2 text-left bg-transparent cursor-pointer transition duration-800 ease-in-out hover:bg-third flex items-center gap-2"
                            onClick={() => handleCancelClick(String(com.id))}
                          >
                            <AiOutlineStop />
                            <span>Cancel</span>
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
                  <MdOutlineKeyboardArrowLeft />
              </button>

              {[...Array(Math.ceil(sortedComplaints.length / complaintsPerPage)).keys()].map(
                (num) => (
                <button
                  key={num}
                  onClick={() => paginate(num + 1)}
                  className={`p-2 flex items-center cursor-pointer bg-gray-300 rounded ${currentPage === num + 1 ? "bg-primary text-white" : ""}`}
                >
                  {num + 1}
                </button>
              ))}

              <button
                className={`p-2 flex items-center cursor-pointer bg-gray-300 rounded ${currentPage === Math.ceil(sortedComplaints.length / complaintsPerPage) ? "cursor-not-allowed" : ""}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(sortedComplaints.length / complaintsPerPage)}
              >
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
              </button>
            </div>
                  <ConfirmationModal
                    show={showModal}
                    title="Cancel Complaint/Feedback"
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmCancel}
                    message="Are you sure you want to cancel this Complaints?"
                  />
		</PageContent>
	);
};

export default ComplaintsList;

