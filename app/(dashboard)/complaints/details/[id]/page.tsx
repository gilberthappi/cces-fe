"use client";
import React,{ useEffect, useState } from "react";
import PageContent from "@/components/shared/PageContent";
import Section from "@/components/shared/Section";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import "react-quill/dist/quill.snow.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateResponseSchema } from "@/constants/response.schema";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { createResponse, getComplaint } from "@/services/complaints";
import { zodResolver } from "@hookform/resolvers/zod";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const ComplaintsDetailsPage: React.FC = () => {
   
    const { id } = useParams() as { id: string };
    const { data: complaint, isLoading } = useQuery({
        queryKey: ["COMPLAINTS", id],
        queryFn: () => getComplaint(id as string),
    });
const { toast } = useToast();
const queryClient = new QueryClient();
const [formLoading, setFormLoading] = useState(false);
const router = useRouter();
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
const form = useForm<z.infer<typeof CreateResponseSchema>>({
    resolver: zodResolver(CreateResponseSchema),
    defaultValues: {
        subject: "",
        feedbackId: id,
        description: "",
        photo: "",
    },
});
// Clean up object URLs when component unmounts
    // Clean up object URLs when component unmounts or photo changes
    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

const mutation = useMutation({
    mutationFn: (data: FormData) => createResponse(data),
    onSuccess: () => {
        toast({
            title: "Response created",
            variant: "primary",
        });
        queryClient.invalidateQueries({ queryKey: ["COMPLAINTS"] });
        setFormLoading(false);
        router.push("/complaints");
    },
    onError: () => {
        toast({
            title: "Failed to create Response",
            variant: "destructive",
        });
        setFormLoading(false);
    },
});

const onSubmit: SubmitHandler<z.infer<typeof CreateResponseSchema>> = async (
    data,
) => {
    setFormLoading(true);
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("feedbackId", data.feedbackId);
    formData.append("description", data.description);

    if (data.photo && data.photo !== "h") {
        formData.append("user[photo]", data.photo);
    } 
    mutation.mutate(formData);
};

    
if (isLoading) return <Loader />;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy");
};
    return (
                <PageContent>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-semibold">
                                CREATE RESPONSE
                            </h1>
                            <Link href="/blog">
                                <Button variant="ghost">
                                    <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                                </Button>
                            </Link>
                        </div>
        
                        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-black">
                            <section className="mb-8">
                                <h2 className="text-xl font-medium mb-3">Gallery</h2>
                                <img src={complaint!.galleryImages[0]} alt="profile" className="w-full h-auto rounded-md" />
                            </section>
                            <section className="mb-8">
                                <h2 className="text-xl font-medium mb-3">Description</h2>
                                <p className="text-gray-700 text-sm">
                                    {complaint?.description.replace(/<\/?[^>]+(>|$)/g, "")}
                                </p>
                            </section>
                            <div className="mb-4 h-30">
                                <p className="text-sm font-medium">
                                    <strong>Posted At:</strong> {complaint?.createdAt ? formatDate(complaint.createdAt) : "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-primary text-white rounded-lg p-8 flex-1">
                            <div className="mb-4 h-10">
                                <h2 className="text-base font-medium">{complaint?.ticket}</h2>
                            </div>
                            <div className="mb-2 h-30">
                                <p className="text-sm font-medium">
                                    <strong>Category:</strong> {complaint?.category}
                                </p>
                            </div>
                            <div className="mb-2 h-30">
                                <p className="text-sm font-medium">
                                    <strong>phoneNumber:</strong> {complaint?.phoneNumber}
                                </p>
                            </div>
                            <div className="mb-2 h-30">
                                <p className="text-sm font-medium">
                                    <strong>Complaints status:</strong> {complaint?.feedbackStatus}
                                </p>
                            </div>
                            <div className="mb-2 h-30">
                                <p className="text-sm font-medium">
                                    <strong>Response status:</strong> {complaint?.responseStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Render responses if available */}
                    {complaint && complaint.response.length > 0 && (
                        <Section title="Responses">
                            <div className="space-y-4">
                                {complaint?.response.map((response) => (
                                    <div
                                        key={response.id}
                                        className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {response.subject}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {response.description.replace(/<\/?[^>]+(>|$)/g, "")}
                                        </p>
                                        {response.photo && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-700">
                                                    Attached Image:
                                                </h4>
                                                <img
                                                    src={response.photo}
                                                    alt="Response Image"
                                                    className="w-full h-auto rounded-md mt-2"
                                                />
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 mt-4">
                                            <strong>Organization:</strong> {response.organization.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}
        
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <Section title="Response Info">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <TextBox
                                            control={form.control}
                                            name="subject"
                                            type="text"
                                            placeholder="Title"
                                            label="Title"
                                        />
                                        <FormField
                                            control={form.control}
                                            name="photo"
                                            render={({ field }) => {
                                               const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                           if (e.target.files && e.target.files.length > 0) {
                                                                                               // Clean up previous URL if exists
                                                                                               if (objectUrl) {
                                                                                                   URL.revokeObjectURL(objectUrl);
                                                                                               }
                                               
                                                                                               const file = e.target.files[0];
                                                                                               field.onChange(file.name);
                                               
                                                                                               try {
                                                               setObjectUrl(URL.createObjectURL(file));
                                                                                               } catch (error) {
                                                                                                   console.error("Error creating object URL:", error);
                                                                                                   setObjectUrl(null);
                                                                                               }
                                                                                           }
                                                                                       };
                                               
        
                                                const previewUrl = objectUrl;
        
                                                return (
                                                    <div>
                                                        <FormLabel className="text-gray-500 text-xs">
                                                            Upload File/Photo
                                                        </FormLabel>
                                                        <FormControl>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                className="hidden"
                                                                id="thumbnail-upload"
                                                            />
                                                        </FormControl>
                                                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                                                            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-32 h-32">
                                                                {previewUrl ? (
                                                                    <img
                                                                        src={previewUrl}
                                                                        alt="Thumbnail preview"
                                                                        className="w-full h-full object-cover rounded-md"
                                                                    />
                                                                ) : (
                                                                    <span className="text-gray-500 text-sm">Click to upload</span>
                                                                )}
                                                            </div>
                                                        </label>
                                                        <FormMessage />
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                </Section>
        
                                <Section title="Description">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={() => (
                                            <div>
                                                <FormControl>
                                                    <Controller
                                                        name="description"
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <div className="border rounded-lg overflow-hidden">
                                                                <ReactQuill {...field} className="h-48" />
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                </Section>
        
                                <div className="text-right">
                                    <Button type="submit" disabled={isLoading || formLoading}>
                                        {isLoading || formLoading ?
                                             "Creating..."
                                            : "Add response"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </PageContent>
    );
};

export default ComplaintsDetailsPage;
