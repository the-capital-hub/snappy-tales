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
                text: "91Springboard, Bannerghatta Rd, Dollars Colony, Phase 4, J. P. Nagar, Bengaluru, Karnataka 560078",
                href: "https://share.google/gJP0af6YTmeulQWab",
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
