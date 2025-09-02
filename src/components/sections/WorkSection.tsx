import type { PortfolioData } from "../../lib/data";
import SkillTag from "../ui/SkillTag";

interface WorkSectionProps {
	experience: PortfolioData["experience"];
	onRef: (element: HTMLElement | null) => void;
}

export default function WorkSection({ experience, onRef }: WorkSectionProps) {
	return (
		<section id="work" ref={onRef} className="min-h-screen py-32 opacity-0">
			<div className="space-y-16">
				<div className="flex items-end justify-between">
					<h2 className="text-4xl font-light">Selected Work</h2>
					<div className="text-sm text-muted-foreground font-mono">
						2019 — 2025
					</div>
				</div>

				<div className="space-y-12">
					{experience.map((job, index) => (
						<article
							key={`${job.company}-${job.year}`}
							className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
						>
							<div className="lg:col-span-2">
								<div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
									{job.year}
								</div>
							</div>

							<div className="lg:col-span-6 space-y-3">
								<div>
									<h3 className="text-xl font-medium">{job.role}</h3>
									<div className="text-muted-foreground">{job.company}</div>
								</div>
								<p className="text-muted-foreground leading-relaxed max-w-lg">
									{job.description}
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
								{job.tech.map((tech) => (
									<SkillTag
										key={tech}
										skill={tech}
										variant="minimal"
										className="group-hover:border-muted-foreground/50"
									/>
								))}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
