"use client";

import { useEffect, useRef, useState } from "react";

export function useSectionObserver() {
	const [activeSection, setActiveSection] = useState("");
	const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

	const observeSection = (id: string, element: HTMLElement | null) => {
		if (element) {
			sectionsRef.current.set(id, element);
		} else {
			sectionsRef.current.delete(id);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const target = entry.target as HTMLElement;
						target.classList.add("animate-fade-in-up");
						setActiveSection(target.id);
					}
				}
			},
			{ threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
		);

		const sections = Array.from(sectionsRef.current.values());
		for (const section of sections) {
			observer.observe(section);
		}

		return () => observer.disconnect();
	}, []);

	const scrollToSection = (sectionId: string) => {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
	};

	return { activeSection, observeSection, scrollToSection };
}
