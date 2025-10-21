import { Phone, Mail, MapPin, Twitter, Instagram } from "lucide-react";
import { ReactNode } from "react";

interface ContactInfo {
	icon: ReactNode; // <-- tell TS this is a React element
	text: string;
	href: string;
}

interface SocialLink {
	icon: ReactNode;
	href: string;
}

const contactInfo: ContactInfo[] = [
	{
		icon: <Phone size={20} />,
		text: "+1012 3456 789",
		href: "tel:+10123456789",
	},
	{
		icon: <Mail size={20} />,
		text: "demo@gmail.com",
		href: "mailto:demo@gmail.com",
	},
	{
		icon: <MapPin size={20} />,
		text: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
		href: "https://maps.google.com/?q=132+Dartmouth+Street+Boston+Massachusetts+02156",
	},
];

const socialLinks: SocialLink[] = [
	{
		icon: <Twitter size={20} />,
		href: "https://twitter.com/",
	},
	{
		icon: <Instagram size={20} />,
		href: "https://www.instagram.com/",
	},
];

export { contactInfo, socialLinks };
