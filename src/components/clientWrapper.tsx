"use client";

import { useEffect, useRef, useState } from "react";

export default function ClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isDark, setIsDark] = useState(true);
	const [activeSection, setActiveSection] = useState("");
	const sectionsRef = useRef<(HTMLElement | null)[]>([]);

	// Theme toggle
	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
	}, [isDark]);

	// IntersectionObserver for animations + active nav
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("animate-fade-in-up");
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
		);

		sectionsRef.current.forEach((section) => {
			if (section) observer.observe(section);
		});

		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => setIsDark(!isDark);

	return (
		<>
			{/* Floating Nav */}
			<nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
				<div className="flex flex-col gap-4">
					{["intro", "work", "thoughts", "connect"].map((section, idx) => (
						<button
							key={section}
							onClick={() =>
								document
									.getElementById(section)
									?.scrollIntoView({ behavior: "smooth" })
							}
							className={`w-2 h-8 rounded-full transition-all duration-500 ${
								activeSection === section
									? "bg-foreground"
									: "bg-muted-foreground/30 hover:bg-muted-foreground/60"
							}`}
							aria-label={`Navigate to ${section}`}
							ref={(el) => {
								sectionsRef.current[idx] = el;
							}}
						/>
					))}
				</div>
			</nav>

			{/* Main Content */}
			{children}

			{/* Floating Controls */}
			<div className="flex items-center gap-4 fixed bottom-6 right-6">
				<button
					onClick={toggleTheme}
					className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
					aria-label="Toggle theme"
				>
					{isDark ? "🌞" : "🌙"}
				</button>
			</div>
		</>
	);
}
