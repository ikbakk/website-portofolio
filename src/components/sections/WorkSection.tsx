import type { PortfolioData } from "../../lib/data";
import SkillTag from "../ui/SkillTag";

interface WorkSectionProps {
	experience: PortfolioData["experience"];
	onRef: (element: HTMLElement | null) => void;
}

export default function WorkSection({
	experience,
	onRef,
}: WorkSectionProps) {
	return (
		<section id="work" ref={onRef} className="min-h-screen py-32">
			<div className="space-y-16">
				<div className="space-y-4">
					<div className="text-sm text-muted-foreground font-mono tracking-wider">
						WORK / EXPERIENCE
					</div>
					<h2 className="text-4xl lg:text-5xl font-light tracking-tight">
						Frontend, mobile, and dashboard work
					</h2>
					<p className="max-w-2xl text-muted-foreground text-lg leading-relaxed">
						Freelance and apprenticeship experience building production mobile apps,
						web dashboards, and full-stack applications with modern tooling.
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


			</div>
		</section>
	);
}
