import { Phone, Mail, MapPin, Instagram, Linkedin } from "lucide-react";
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
                text: "+91 7026020151",
                href: "tel:+917026020151",
        },
        {
                icon: <Mail size={20} />,
                text: "hello@snappytails.com",
                href: "mailto:hello@snappytails.com",
        },
        {
                icon: <MapPin size={20} />,
                text: "91 SPringboard JP Nagar",
                href: "https://maps.google.com/?q=91+SPringboard+JP+Nagar",
        },
];

const socialLinks: SocialLink[] = [
        {
                icon: <Instagram size={20} />,
                href: "https://www.instagram.com/snappy.tales_official/",
        },
        {
                icon: <Linkedin size={20} />,
                href: "https://www.linkedin.com/company/snappy-tales-official/",
        },
];

export { contactInfo, socialLinks };
