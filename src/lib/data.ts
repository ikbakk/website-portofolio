export const portfolioData = {
	personal: {
		name: "Iqbal Firdaus",
		role: "Software developer that love to crafting digital experiences at the intersection of design, technology, and human behavior.",
		location: "Mataram, Indonesia",
		email: "ikbakfir@gmail.com",
		currentPosition: {
			title: "Freelance Frontend Developer",
			company: "",
			period: "2024 — Present",
		},
	},
	skills: ["TypeScript", "React", "Nodejs", "Esp 32"],
	experience: [
		{
			year: "2023",
			role: "Senior Frontend Engineer",
			company: "Vercel",
			description:
				"Leading frontend architecture for developer tools and AI-powered features.",
			tech: ["React", "TypeScript", "Next.js"],
		},
		{
			year: "2022",
			role: "Frontend Engineer",
			company: "Linear",
			description:
				"Built performant interfaces for project management and team collaboration.",
			tech: ["React", "GraphQL", "Framer Motion"],
		},
		{
			year: "2021",
			role: "Full Stack Developer",
			company: "Stripe",
			description:
				"Developed payment infrastructure and merchant-facing dashboard features.",
			tech: ["Ruby", "React", "PostgreSQL"],
		},
		{
			year: "2019",
			role: "Software Engineer",
			company: "Airbnb",
			description:
				"Created booking flow optimizations and host management tools.",
			tech: ["React", "Node.js", "MySQL"],
		},
	],
	posts: [
		{
			title: "The Future of Web Development",
			excerpt:
				"Exploring how AI and automation are reshaping the way we build for the web.",
			date: "Dec 2024",
			readTime: "5 min",
		},
		{
			title: "Design Systems at Scale",
			excerpt:
				"Lessons learned from building and maintaining design systems across multiple products.",
			date: "Nov 2024",
			readTime: "8 min",
		},
		{
			title: "Performance-First Development",
			excerpt:
				"Why performance should be a first-class citizen in your development workflow.",
			date: "Oct 2024",
			readTime: "6 min",
		},
		{
			title: "The Art of Code Review",
			excerpt:
				"Building better software through thoughtful and constructive code reviews.",
			date: "Sep 2024",
			readTime: "4 min",
		},
	],
	social: [
		{ name: "GitHub", handle: "ikbakk", url: "https://github.com/ikbakk" },
		{
			name: "LinkedIn",
			handle: "Muhammad Iqbal Firdaus",
			url: "https://linkedin.com/in/ikbakk",
		},
	],
} as const;

export type PortfolioData = typeof portfolioData;
