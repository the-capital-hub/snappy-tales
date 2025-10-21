"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Send } from "lucide-react";
import { contactFormSchema } from "./ContactSchema";
import z from "zod";

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		try {
			// Simulate sending data
			await new Promise((resolve) => setTimeout(resolve, 1500));
			console.log("Data sent:", data);
			toast.success("Message sent successfully!");
		} catch (error) {
			console.error("Error sending message:", error);
			toast.error("Failed to send message. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-1 md:grid-cols-2 gap-6"
		>
			<div>
				<label htmlFor="firstName" className="block text-sm text-gray-400 dark:text-gray-800 mb-1">
					First Name
				</label>
				<input
					type="text"
					id="firstName"
					{...register("firstName")}
					className="w-full dark:bg-neutral-200 dark:text-black bg-neutral-900/50 text-white border-b border-[#F4C906]/50 rounded-full px-4 py-2 focus:outline-hidden "
				/>
				{errors.firstName && (
					<p className="text-red-500">{errors.firstName.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="lastName" className="block text-sm text-gray-400 dark:text-gray-800 mb-1">
					Last Name
				</label>
				<input
					type="text"
					id="lastName"
					{...register("lastName")}
					className="w-full dark:bg-neutral-200 dark:text-black bg-neutral-900/50 text-white border-b border-[#F4C906]/50 rounded-full px-4 py-2 focus:outline-hidden "
				/>
				{errors.lastName && (
					<p className="text-red-500">{errors.lastName.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="email" className="block text-sm text-gray-400 dark:text-gray-800 mb-1">
					Email
				</label>
				<input
					type="email"
					id="email"
					{...register("email")}
					className="w-full dark:bg-neutral-200 dark:text-black bg-neutral-900/50 text-white border-b border-[#F4C906]/50 rounded-full px-4 py-2 focus:outline-hidden "
				/>
				{errors.email && <p className="text-red-500">{errors.email.message}</p>}
			</div>

			<div>
				<label htmlFor="phone" className="block text-sm text-gray-400 dark:text-gray-800 mb-1">
					Phone Number
				</label>
				<input
					type="tel"
					id="phone"
					{...register("phone")}
					className="w-full dark:bg-neutral-200 dark:text-black bg-neutral-900/50 text-white border-b border-[#F4C906]/50 rounded-full px-4 py-2 focus:outline-hidden "
				/>
				{errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
			</div>

			<div className="md:col-span-2">
				<label className="block text-sm text-gray-400 dark:text-gray-800 mb-3">Choose One</label>
				<div className="flex gap-8">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="radio"
							value="fundraising"
							{...register("service")}
							className="text-[#F4C906] focus:ring-[#F4C906]"
						/>
						<span className="text-white dark:text-black">Fundraising</span>
					</label>
					<label className="flex items-center gap-2 cursor-pointer dark:text-black">
						<input
							type="radio"
							value="webDevelopment"
							{...register("service")}
							className="text-orange-500 focus:ring-[#F4C906]"
						/>
						<span className="text-white dark:text-black">Web Development</span>
					</label>
				</div>
			</div>

			<div className="md:col-span-2">
				<label htmlFor="message" className="block text-sm text-gray-400 dark:text-gray-800 mb-1">
					Message
				</label>
				<textarea
					id="message"
					{...register("message")}
					placeholder="Write your message..."
					rows={4}
					className="w-full dark:bg-neutral-200 dark:text-black bg-neutral-900/50 text-white border-b border-[#F4C906]/50 rounded-3xl px-4 py-2 focus:outline-hidden "
				></textarea>
				{errors.message && (
					<p className="text-red-500">{errors.message.message}</p>
				)}
			</div>

			<div className="md:col-span-2 flex justify-end">
				<button
					type="submit"
					className="bg-[#F4C906] hover:bg-[#f8d228] text-black px-6 py-3 rounded-md flex items-center gap-2 disabled:opacity-70"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Sending..." : "Send Message"}
					<Send size={18} />
				</button>
			</div>
		</form>
	);
}
