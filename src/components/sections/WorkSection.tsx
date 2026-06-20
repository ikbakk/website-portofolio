import Link from "next/link";
import type { PortfolioData } from "../../lib/data";
import SkillTag from "../ui/SkillTag";

interface WorkSectionProps {
	experience: PortfolioData["experience"];
	projects: PortfolioData["projects"];
	onRef: (element: HTMLElement | null) => void;
}

export default function WorkSection({
	experience,
	projects,
	onRef,
}: WorkSectionProps) {
	return (
		<section id="work" ref={onRef} className="min-h-screen py-32 opacity-0">
			<div className="space-y-16">
				<div className="space-y-4">
					<div className="text-sm text-muted-foreground font-mono tracking-wider">
						WORK / EXPERIENCE
					</div>
					<h2 className="text-4xl lg:text-5xl font-light tracking-tight">
						Frontend, mobile, and dashboard work
					</h2>
					<p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
						CV-backed freelance experience paired with public GitHub projects that
						show my focus on performant UI, mobile apps, IoT dashboards, and clean
						developer workflows.
					</p>
				</div>

				<div className="space-y-8">
					{experience.map((item) => (
						<article
							key={`${item.role}-${item.company}-${item.year}`}
							className="grid gap-4 border-t border-border pt-8 lg:grid-cols-[9rem_1fr]"
						>
							<div className="text-sm text-muted-foreground font-mono">
								{item.year}
							</div>

							<div className="space-y-4">
								<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
									<div>
										<h3 className="text-2xl font-light text-foreground">
											{item.role}
										</h3>
										<div className="text-muted-foreground">{item.company}</div>
									</div>
									<div className="text-sm text-muted-foreground">{item.location}</div>
								</div>

								<p className="text-muted-foreground leading-relaxed">
									{item.description}
								</p>

								<div className="flex flex-wrap gap-2">
									{item.tech.map((tech) => (
										<SkillTag key={tech} skill={tech} />
									))}
								</div>
							</div>
						</article>
					))}
				</div>

				<div className="space-y-8">
					<div className="space-y-3">
						<div className="text-sm text-muted-foreground font-mono tracking-wider">
							PUBLIC GITHUB PROJECTS
						</div>
						<h3 className="text-3xl font-light tracking-tight">
							Selected repositories
						</h3>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						{projects.map((project) => (
							<Link
								key={project.title}
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex min-h-56 flex-col justify-between rounded-lg border border-border p-5 transition-all duration-300 hover:border-muted-foreground/50 hover:shadow-sm"
							>
								<div className="space-y-3">
									<h4 className="text-xl font-light group-hover:text-muted-foreground transition-colors duration-300">
										{project.title}
									</h4>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{project.description}
									</p>
								</div>

								<div className="flex flex-wrap gap-2 pt-6">
									{project.tech.map((tech) => (
										<SkillTag key={tech} skill={tech} />
									))}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
