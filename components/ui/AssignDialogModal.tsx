import React, { useState } from "react";
import Section from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormLabel,
} from "@/components/ui/form";
import { useMutation, useQuery} from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { createAssign } from "@/services/assign";
import { type SubmitHandler, useForm } from "react-hook-form";
import { IAmbulance, IAssign, IHealth } from "@/types";
import { getAllHealthFacilty } from "@/services/health";
import { CreateAssignSchema } from "@/constants/assign.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type z from "zod";
import { getAllAmbulance } from "@/services/ambulance";
import Loader from "@/components/ui/Loader";

interface AssignDialogModalProps {
	show: boolean;
	onClose: () => void;
	alertId: string;
    defaults?: Partial<IAssign>;
    isLoading: boolean;
}

const AssignDialogModal: React.FC<AssignDialogModalProps> = ({
	show,
	onClose,
	alertId,
    defaults,
    isLoading,
}) => {

	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

    const { data: ambulance } = useQuery<IAmbulance[]>({
        queryKey: ["AMBULANCE"],
        queryFn: getAllAmbulance,
    });
    
    const { data: hospital } = useQuery<IHealth[]>({
        queryKey: ["HEALTH"],
        queryFn: getAllHealthFacilty,
    });

    const form = useForm<z.infer<typeof CreateAssignSchema>>({
        resolver: zodResolver(CreateAssignSchema),
        defaultValues: {
            hospitalId: defaults?.hospitalId || "",
            alertId: defaults?.alertId || alertId,
            ambulanceId: defaults?.ambulanceId || "",
        },
    });

	const mutation = useMutation({
		mutationFn: (data: FormData) => 
            defaults
                            ? createAssign(data)
                            : createAssign(data),
		onSuccess: () => {
			toast({ title: "Assignment successful", variant: "primary" });
			setLoading(false);
			onClose();
		},
		onError: () => {
			toast({ title: "Assignment failed", variant: "destructive" });
			setLoading(false);
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof CreateAssignSchema>> = async (
            data,
        ) => {
		setLoading(true);
		const formData = new FormData();
		formData.append("alertId", alertId);
		formData.append("ambulanceId", data.ambulanceId);
        formData.append("hospitalId", data.hospitalId);
		mutation.mutate(formData);
	};

	if (!show) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
				<h2 className="text-xl font-semibold mb-4">Confirm Assignment</h2>
                {isLoading ? (
                                <Loader />
                            ) : (
                                <>
				<p>assign an ambulance and health facility.</p>
                 <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <Section title="Assignment Info">
                                            <div className="grid md:grid-cols-1 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="ambulanceId"
                                                    render={({ field }) => (
                                                        <div>
                                                            <FormLabel className="text-gray-500 text-xs">
                                                                Ambulance
                                                            </FormLabel>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button className="bg-background w-full text-gray-500 text-left">
                                                                    {field.value && field.value.length > 0
                                                                        ? (ambulance?? [])
                                                                              .filter(option => field.value.includes(option.id))
                                                                              .map(option => `${option.user.firstName} ${option.user.lastName}- ${option.currentLocation}`)
                                                                              .join(", ")
                                                                        : "Select Ambulance"}
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                {ambulance?.map(option => (
                                                                        <DropdownMenuItem
                                                                        key={String(option.id)}
                                                                        onSelect={() => field.onChange(option.id)}
                                                                    >
                                                                        {option.user.firstName} {option.user.lastName}- {option.currentLocation}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    )}
                                                />
                                                 <FormField
                                                    control={form.control}
                                                    name="hospitalId"
                                                    render={({ field }) => (
                                                        <div>
                                                            <FormLabel className="text-gray-500 text-xs">
                                                            Health Facility
                                                            </FormLabel>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button className="bg-background w-full text-gray-500 text-left">
                                                                    {field.value && field.value.length > 0
                                                                        ? (hospital?? [])
                                                                              .filter(option => field.value.includes(option.id))
                                                                              .map(option => `${option.name}- ${option.location}`)
                                                                              .join(", ")
                                                                        : "Select Health Facility"}
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    {hospital?.map(option => (
                                                                        <DropdownMenuItem
                                                                        key={String(option.id)}
                                                                        onSelect={() => field.onChange(option.id)}
                                                                    >
                                                                        {option.name}- {option.location}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    )}
                                                />
                                                                            
                                                           
                                            </div>
                                        </Section>
                
                                        <div className="flex justify-end space-x-4 mt-4">
                                        <button
						type="button"
						className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
						onClick={onClose}
					>
						Cancel
					</button>
                                            <Button type="submit" disabled={loading}>
                                            {loading ? "Assigning..." : "Confirm"}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                                </>
				)}
			</div>
		</div>
	);
};

export default AssignDialogModal;
