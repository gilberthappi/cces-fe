"use client";
import Image from "next/image";
import { LoginForm } from "@/components/Login/loginForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { useSearchParams } from "next/navigation";
import React from "react";
// import { Outlet } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const SignInPage = () => {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/welcome");
  }

  return (
    <>
      <main className="h-full w-full min-h-full flex items-center justify-center min-h-screen px-10 bg-white">
        <div className="flex flex-col lg:flex-row justify-center xl:max-w-[90%] w-full  gap-[2rem] lg:gap-[10%] items-strech h-full">
          <div className="hidden md:flex flex-col col-span-2 lg:col-span-2 xl:col-span-3 space-y-8 max-w-full">
            <div className="flex flex-col space-y-4 pt-12 lg:mt-0 items-center justify-center lg:flex-row lg:space-x-10 lg:space-y-0 lg:justify-start">
              <Image
                src="/cceslogo.png"
                alt="CCES Logo"
                className="w-auto h-16"
                width={64}
                height={64}
              />
              <div className="text-2xl font-bold text-center lg:text-left">
                CITIZEN COMPLAINTS AND ENGAGEMENT SYSTEM
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-5 text-sm text-gray-500">
              <div className="text-sm text-gray-500 font-normal flex flex-col gap-2">
                <div>
                  CITIZEN COMPLAINTS AND ENGAGEMENT SYSTEM is a platform
                  designed to empower citizens by providing a streamlined
                  process for lodging complaints and engaging with relevant
                  authorities. Our mission is to enhance transparency,
                  accountability, and community collaboration.
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-5 text-sm text-gray-500">
              <div>
                <div className="flex items-center gap-2 ">
                  <CheckCircleIcon className="text-primary w-5" />
                  <div className="text-gray-900 font-medium">
                    Easy Complaint Submission -{" "}
                    <span className="text-gray-500">
                      Simplified forms for reporting issues quickly
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <CheckCircleIcon className="text-primary w-5" />
                  <div className="text-gray-900 font-medium">
                    Transparent Tracking -{" "}
                    <span className="text-gray-500">
                      Monitor the progress of your complaints in real-time
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <CheckCircleIcon className="text-primary w-5" />
                  <div className="text-gray-900 font-medium">
                    Community Engagement -{" "}
                    <span className="text-gray-500">
                      Collaborate with others to address common concerns
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 ">
                  <CheckCircleIcon className="text-primary w-5" />
                  <div className="text-gray-900 font-medium">
                    Efficient Resolutions -{" "}
                    <span className="text-gray-500">
                      Ensure timely responses from relevant authorities
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={"/brand.png"}
              alt="CCES Logo"
              className="hidden lg:flex w-full h-100"
              width={500}
              height={500}
            />
          </div>
          <div className="bg-white  col-span-2  flex  min-h-full justify-center items-strech w-full ">
            <div className="max-w-xl lg:shadow-2xl max-w-xl lg:px-16 pt-6 pb-12 lg:pb-0 lg:rounded-2xl flex items-center border-t">
              {/* <Outlet /> */}
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignInPage;
