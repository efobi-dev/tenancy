"use client";

import { Input } from "./ui/input";
import { Loader } from "lucide-react";
import { useState } from "react";
import { uploadAvatar } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";

export function UploadProfile() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

	async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			toast({
				title: "Upload failed",
				description: "File size must be less than 2MB",
				variant: "destructive",
			});
			return;
		}

		try {
			setIsLoading(true);
			const { error, message } = await uploadAvatar(file);
			if (error) {
				toast({
					title: "Upload failed",
					description: error,
					variant: "destructive",
				});
				return;
			}
			toast({
				title: "Upload successful",
				description: message,
			});
		} catch (error) {
			console.error(error);
			toast({
				title: "Upload failed",
				description: "Internal server error",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="relative">
			<Input
				type="file"
				accept="image/*"
				onChange={handleFileUpload}
				disabled={isLoading}
			/>
			{isLoading && (
				<div className="absolute right-2 top-1/2 -translate-y-1/2">
					<Loader className="h-4 w-4 animate-spin" />
				</div>
			)}
		</div>
	);
}
