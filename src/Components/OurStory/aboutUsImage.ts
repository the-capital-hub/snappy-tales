import PramodPic from "../../../public/AboutUs/NewImages/Pramod.png";
import UpmaPic from "../../../public/AboutUs/NewImages/Upma.png";
import AmanPic from "../../../public/AboutUs/NewImages/Aman.png";
import MeghaPic from "../../../public/Aboutus/NewImages/Megha.png"

const teamMembers = [
	{
		name: "Upma Singh",
		position: "Senior Investment Analyst",
		expertise: "GTM and fundraising expert",
		image: UpmaPic,
		linkedinUrl: "https://linkedin.com",
	},
	{
		name: "Aman Dwivedi",
		position: "Head of Technology",
		expertise: "MVP and tech strategist",
		image: AmanPic,
		linkedinUrl: "https://linkedin.com",
	},
	{
		name: "Megha Rustagi",
		position: "Investment Analyst",
		expertise: "Data driven startup insights",
		image: MeghaPic,
		linkedinUrl: "https://linkedin.com",
	},
];

const founder = {
	name: "Pramod Badiger",
	position: "Founder and CEO",
	expertise: "Innovator and visionary",
	image: PramodPic,
	linkedinUrl: "https://linkedin.com",
};

const title = "About Us | The Capital HUB";
const description =
	"The Capital HUB - Your Gateway to Startup Success. Discover the passionate team driving India's startup revolution.";

export { teamMembers, founder, title, description };
