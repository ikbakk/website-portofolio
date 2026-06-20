export const portfolioData = {
	personal: {
		name: "Muhammad Iqbal Firdaus",
		role: "Frontend & mobile developer building modern web and mobile experiences with performance-focused UI and clean developer workflows.",
		location: "Mataram, Indonesia",
		email: "ikbakfir@gmail.com",
		phone: "+62 87815509168",
		currentPosition: {
			title: "Freelance Frontend & Mobile Developer",
			company: "Remote",
			period: "March 2024 — Present",
		},
	},
	skills: [
		"TypeScript",
		"JavaScript",
		"Dart",
		"React",
		"Next.js",
		"Flutter",
		"React Native",
		"Node.js",
		"Express.js",
		"NestJS",
		"Tailwind CSS",
		"Linux",
		"Git",
	],
	projects: [
		{
			title: "ESP32 Ward Monitor",
			description:
				"TypeScript-based ward monitoring project that reflects my interest in IoT dashboards and operational visibility.",
			tech: ["TypeScript", "IoT", "ESP32"],
			url: "https://github.com/ikbakk/esp32-ward-monitor",
		},
		{
			title: "Portfolio Website",
			description:
				"This portfolio website, built to present my frontend, mobile, freelance, and project experience in one focused place.",
			tech: ["TypeScript", "Next.js", "Tailwind CSS"],
			url: "https://github.com/ikbakk/website-portofolio",
		},
		{
			title: "Robokarsa Clone",
			description:
				"Frontend implementation practice focused on translating an existing product experience into responsive React UI.",
			tech: ["TypeScript", "React", "UI Implementation"],
			url: "https://github.com/ikbakk/robokarsa-clone",
		},
		{
			title: "Full Stack Open Backend",
			description:
				"Backend submission work demonstrating Node.js API fundamentals and full-stack learning practice.",
			tech: ["JavaScript", "Node.js", "Express.js"],
			url: "https://github.com/ikbakk/full-stack-open-submission-part3-backend",
		},
	],
	experience: [
		{
			year: "2025 — Present",
			role: "Mobile Developer",
			company: "Freelance",
			location: "Remote",
			description:
				"Maintained and optimized Flutter and React Native mobile applications, implementing Figma-based features, backend API integrations, localization support, and CMS-powered dynamic content flows.",
			tech: ["Flutter", "React Native", "Sanity CMS", "APIs", "Localization"],
		},
		{
			year: "2024 — 2026",
			role: "Web Developer",
			company: "Freelance",
			location: "Remote",
			description:
				"Delivered end-to-end web applications across analytics, restaurant, automotive, and government workflows, including modular refactors, Backend-for-Frontend patterns, secure authentication, PDF digital signing, and optimized WordPress experiences.",
			tech: ["React", "Next.js", "SolidJS", "WordPress", "BFF", "Authentication"],
		},
		{
			year: "2024 — 2025",
			role: "Web Dashboard Developer",
			company: "Freelance",
			location: "Remote",
			description:
				"Developed real-time IoT monitoring and analytics dashboards with data visualization, reducing manual device tracking and improving operational visibility for stakeholders.",
			tech: ["React", "MQTT", "Firebase", "Recharts", "React Query"],
		},
		{
			year: "2023",
			role: "Full-stack Engineering Apprentice",
			company: "Generasi Gigih 3.0",
			location: "Indonesia",
			description:
				"Completed an intensive full-stack engineering path, building a Spotify-inspired music web app and leading a team capstone waste management application with MongoDB and REST APIs.",
			tech: ["React", "Express.js", "Spotify API", "MongoDB", "REST APIs"],
		},
	],
	education: [
		{
			school: "Universitas Mataram",
			degree: "Electrical Engineering",
			location: "Mataram, Indonesia",
			period: "2017 — 2024",
		},
	],
	posts: [
		{
			title: "Building maintainable client applications",
			excerpt:
				"Notes from refactoring legacy frontends into modular, scalable application architectures.",
			date: "2025",
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
