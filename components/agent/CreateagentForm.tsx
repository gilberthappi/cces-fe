"use client";
import React, { useEffect, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import "react-quill/dist/quill.snow.css";
import type { IUser } from "@/types/index";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { createAgent, updateAgent } from "@/services/agent";
import { CreateAgentSchema } from "@/constants/agent.schema";

const rolesOptions = [
    { value: "ORGANIZATION", label: "ORGANIZATION" },
];

type PropertyFormProps = {
    isLoading: boolean;
    isUpdate?: boolean;
    defaults?: Partial<IUser>;
};

export default function CreateAgentForm({
    isLoading,
    isUpdate,
    defaults,
}: PropertyFormProps) {
    const { toast } = useToast();
    const queryClient = new QueryClient();
    const [formLoading, setFormLoading] = useState(false);
    const router = useRouter();
    const [objectUrl, setObjectUrl] = useState<string | null>(null);

    const form = useForm<z.infer<typeof CreateAgentSchema>>({
        resolver: zodResolver(CreateAgentSchema),
        defaultValues: {
            name: defaults?.organization?.name || "",
            category: defaults?.organization?.category || "",
            address: defaults?.organization?.address || "",
            tags: defaults?.organization?.tags || [],
            user: {
                firstName: defaults?.firstName || "",
                lastName: defaults?.lastName || "",
                email: defaults?.email || "",
                password: defaults?.password || "Password123!",
                phoneNumber: defaults?.phoneNumber || "",
                photo: defaults?.photo || "",
                role: "",
            },
        },
    });

    // Clean up object URLs when component unmounts or photo changes
    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    const mutation = useMutation({
        mutationFn: (data: FormData) =>
            isUpdate && defaults?.id
                ? updateAgent(defaults.id, data)
                : createAgent(data),
        onSuccess: () => {
            toast({
                title: `Orgazation ${isUpdate ? "updated" : "created"}`,
                variant: "primary",
            });
            queryClient.invalidateQueries({ queryKey: ["USER"] });
            setFormLoading(false);
            router.push("/users");
        },
        onError: () => {
            toast({
                title: `Failed to ${isUpdate ? "update" : "create"} Orgazation`,
                variant: "destructive",
            });
            setFormLoading(false);
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof CreateAgentSchema>> = async (
        data,
    ) => {
        setFormLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("category", data.category);
        formData.append("address", data.address);
        data.tags?.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
        formData.append("user[firstName]", data.user.firstName);
        formData.append("user[lastName]", data.user.lastName);
        formData.append("user[email]", data.user.email);
        formData.append("user[password]", data.user.password);
        formData.append("user[phoneNumber]", data.user.phoneNumber);
        formData.append("user[role]", data.user.role);

        if (data.user.photo?.[0] && data.user.photo?.[0] !== "h") {
            formData.append("user[photo]", data.user.photo[0]);
        } else if (isUpdate && defaults?.photo) {
            formData.append("user[photo]", defaults.photo);
        }

        mutation.mutate(formData);
    };

    return (
        <PageContent>
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold">
                        {isUpdate ? "UPDATE" : "CREATE"}
                    </h1>
                    <Link href="/users">
                        <Button variant="ghost">
                            <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
                        </Button>
                    </Link>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Section title="Organization Info">
                            <div className="grid md:grid-cols-2 gap-6">
                                <TextBox
                                    control={form.control}
                                    name="name"
                                    type="text"
                                    placeholder="Organization Name"
                                    label="Organization Name"
                                />
                                <TextBox
                                    control={form.control}
                                    name="category"
                                    type="text"
                                    placeholder="Category"
                                    label="Category"
                                />
                                <TextBox
                                    control={form.control}
                                    name="address"
                                    type="text"
                                    placeholder="Address"
                                    label="Address"
                                />
                                <TextBox
                                    control={form.control}
                                    name="tags"
                                    type="text"
                                    placeholder="Tags (comma-separated)"
                                    label="Tags"
                                    onChange={(e) => {
                                        const value = e.target.value.split(",").map((tag) => tag.trim());
                                        form.setValue("tags", value);
                                    }}
                                />
                            </div>
                        </Section>
                        <Section title="Agent Info">
                            <div className="grid md:grid-cols-2 gap-6">
                                <TextBox
                                    control={form.control}
                                    name="user.firstName"
                                    type="text"
                                    placeholder="FirstName"
                                    label="FirstName"
                                />
                                <TextBox
                                    control={form.control}
                                    name="user.lastName"
                                    type="text"
                                    placeholder="LastName"
                                    label="LastName"
                                />
                                <TextBox
                                    control={form.control}
                                    name="user.password"
                                    type="text"
                                    placeholder="password"
                                    label="Password"
                                />
                                <TextBox
                                    control={form.control}
                                    name="user.email"
                                    type="text"
                                    placeholder="email"
                                    label="Email"
                                />
                                <TextBox
                                    control={form.control}
                                    name="user.phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    label="Phone Number"
                                />
                                <FormField
                                    control={form.control}
                                    name="user.role"
                                    render={({ field }) => (
                                        <div>
                                            <FormLabel className="text-gray-500 text-xs">
                                                Role
                                            </FormLabel>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button className="bg-background w-full text-gray-500 text-left">
                                                        {field.value ? rolesOptions.find(option => option.value === field.value)?.label : "Select Role"}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {rolesOptions.map(option => (
                                                        <DropdownMenuItem
                                                            key={String(option.value)}
                                                            onSelect={() => field.onChange(option.value)}
                                                        >
                                                            {option.label}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user.photo"
                                    render={({ field }) => {
                                        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                // Clean up previous URL if exists
                                                if (objectUrl) {
                                                    URL.revokeObjectURL(objectUrl);
                                                }

                                                const file = e.target.files[0];
                                                field.onChange(e.target.files);

                                                try {
                                                    setObjectUrl(URL.createObjectURL(file));
                                                } catch (error) {
                                                    console.error("Error creating object URL:", error);
                                                    setObjectUrl(null);
                                                }
                                            }
                                        };

                                        const previewUrl = objectUrl || defaults?.photo;

                                        return (
                                            <div>
                                                <FormLabel className="text-gray-500 text-xs">
                                                    Upload Profile Photo
                                                </FormLabel>
                                                <FormControl>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                        id="photo-upload"
                                                    />
                                                </FormControl>
                                                <label htmlFor="photo-upload" className="cursor-pointer">
                                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-32 h-32">
                                                        {previewUrl ? (
                                                            <img
                                                                src={previewUrl}
                                                                alt="Profile preview"
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

                        <div className="text-right">
                            <Button type="submit" disabled={isLoading || formLoading}>
                                {isLoading || formLoading
                                    ? isUpdate
                                        ? "Updating..."
                                        : "Creating..."
                                    : isUpdate
                                        ? "Update"
                                        : "Create"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </PageContent>
    );
}