import type { PortfolioData } from "../../lib/data";
import SkillTag from "../ui/SkillTag";

interface HeroSectionProps {
	data: PortfolioData["personal"] & { skills: PortfolioData["skills"] };
	onRef: (element: HTMLElement | null) => void;
}

export default function HeroSection({ data, onRef }: HeroSectionProps) {
	return (
		<header id="intro" ref={onRef} className="min-h-screen flex items-center">
			<div className="flex flex-col lg:flex-row gap-16 w-full">
				<div className="flex flex-col gap-8 w-full">
					<div className="space-y-2">
						<div className="text-sm text-muted-foreground font-mono tracking-wider">
							PORTFOLIO / <span className="text-primary">2025</span>
						</div>
						<h1 className="text-6xl lg:text-7xl font-light tracking-tight">
							<span className="text-muted-foreground">
								{data.name.split(" ")[0]}
							</span>
							<br />
							<span>{data.name.split(" ")[1]}</span>
							<br />
							<span className="text-muted-foreground">
								{data.name.split(" ")[2]}
							</span>
						</h1>
					</div>

					<div className="space-y-6 max-w-md">
						<p className="text-xl  leading-relaxed">{data.role}</p>

						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
								Available for work
							</div>
							<div>{data.location}</div>
						</div>
					</div>
				</div>

				<div className=" flex flex-col w-full justify-end gap-8">
					<div className="flex flex-col gap-4">
						<div className="text-sm text-muted-foreground font-mono">
							CURRENTLY
						</div>
						<div className="flex flex-col gap-2">
							<div className="text-foreground">
								{data.currentPosition.title}
							</div>
							{/* <div className="text-muted-foreground"> */}
							{/* 	@ {data.currentPosition.company} */}
							{/* </div> */}
							<div className="text-xs text-muted-foreground">
								{data.currentPosition.period}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div className="text-sm text-muted-foreground font-mono">FOCUS</div>
						<div className="flex flex-wrap gap-2">
							{data.skills.map((skill) => (
								<SkillTag key={skill} skill={skill} />
							))}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
