import { Badge } from "./badge";

interface SkillTagProps {
	skill: string;
	variant?: "default" | "outline" | "destructive" | "secondary";
}

export default function SkillTag({
	skill,
	variant = "default",
}: SkillTagProps) {
	return (
		<Badge className="py-1" variant={variant}>
			{skill}
		</Badge>
	);
}
