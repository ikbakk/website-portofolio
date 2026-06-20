"use client";

import { useSectionObserver } from "../hooks/useSectionObserver";
import type { PortfolioData } from "../lib/data";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ConnectSection from "./sections/ConnectSection";
import HeroSection from "./sections/HeroSection";
import ThoughtsSection from "./sections/ThoughtsSection";
import WorkSection from "./sections/WorkSection";
import { ThemeProvider } from "./ThemeProvider";

interface PortfolioClientProps {
	data: PortfolioData;
}

export default function PortfolioClient({ data }: PortfolioClientProps) {
	const { activeSection, observeSection, scrollToSection } =
		useSectionObserver();

	return (
		<ThemeProvider>
			<div className="min-h-screen bg-background text-foreground relative">
				<Navigation
					activeSection={activeSection}
					onSectionClick={scrollToSection}
				/>

				<main className="max-w-4xl mx-auto px-8 lg:px-16">
					<HeroSection
						data={{ ...data.personal, skills: data.skills }}
						onRef={(el) => observeSection("intro", el)}
					/>

					<WorkSection
						experience={data.experience}
						projects={data.projects}
						onRef={(el) => observeSection("work", el)}
					/>

					{/* <ThoughtsSection */}
					{/* 	posts={data.posts} */}
					{/* 	onRef={(el) => observeSection("thoughts", el)} */}
					{/* /> */}

					<ConnectSection
						email={data.personal.email}
						social={data.social}
						onRef={(el) => observeSection("connect", el)}
					/>

					<Footer />
				</main>

				<div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
			</div>
		</ThemeProvider>
	);
}
