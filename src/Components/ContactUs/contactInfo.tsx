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
                text: "+91 6366255319",
                href: "tel:+916366255319",
        },
        {
                icon: <Mail size={20} />,
                text: "investments@thecapitalhub.in",
                href: "mailto:investments@thecapitalhub.in",
        },
        {
                icon: <MapPin size={20} />,
                text: "The Capital Hub, 7th block, Jayanagar, Bengaluru - 560070",
                href: "https://maps.google.com/?q=The+Capital+Hub,+7th+block,+Jayanagar,+Bengaluru+-+560070",
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
