import Link from "next/link";
import type { PortfolioData } from "../../lib/data";

interface ConnectSectionProps {
	email: string;
	social: PortfolioData["social"];
	onRef: (element: HTMLElement | null) => void;
}

const ArrowIcon = () => (
	<svg
		className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M17 8l4 4m0 0l-4 4m4-4H3"
		/>
	</svg>
);

export default function ConnectSection({
	email,
	social,
	onRef,
}: ConnectSectionProps) {
	return (
		<section id="connect" ref={onRef} className="py-32">
			<div className="grid lg:grid-cols-2 gap-16">
				<div className="space-y-8">
					<h2 className="text-4xl font-light">Let's Connect</h2>

					<div className="space-y-6">
						<p className="text-xl text-muted-foreground leading-relaxed">
							Always interested in new opportunities, collaborations, and
							conversations about technology and design.
						</p>

						<div className="space-y-4">
							<Link
								href={`mailto:${email}`}
								className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
							>
								<span className="text-lg">{email}</span>
								<ArrowIcon />
							</Link>
						</div>
					</div>
				</div>

				<div className="space-y-8">
					<div className="text-sm text-muted-foreground font-mono">
						ELSEWHERE
					</div>

					<div className="grid grid-cols-2  gap-4">
						{social.map((platform) => (
							<Link
								key={platform.name}
								href={platform.url}
								className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
							>
								<div className="space-y-2">
									<div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
										{platform.name}
									</div>
									<div className="text-sm text-muted-foreground">
										{platform.handle}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
