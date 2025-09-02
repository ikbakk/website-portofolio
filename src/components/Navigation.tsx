"use client";

interface NavigationProps {
	activeSection: string;
	onSectionClick: (section: string) => void;
}

const sections = [
	{ id: "intro", label: "Introduction" },
	{ id: "work", label: "Work Experience" },
	// { id: "thoughts", label: "Blog Posts" },
	{ id: "connect", label: "Contact" },
];

export default function Navigation({
	activeSection,
	onSectionClick,
}: NavigationProps) {
	return (
		<nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
			<div className="flex flex-col gap-4">
				{sections.map((section) => (
					<button
						key={section.id}
						type="button"
						onClick={() => onSectionClick(section.id)}
						className={`w-2 h-8 rounded-full transition-all duration-500 ${
							activeSection === section.id
								? "bg-primary"
								: "bg-muted-foreground/30 hover:bg-primary/40"
						}`}
						aria-label={`Navigate to ${section.label}`}
					/>
				))}
			</div>
		</nav>
	);
}
