import type { PortfolioData } from "../../lib/data";
import SkillTag from "../ui/SkillTag";

interface WorkSectionProps {
  experience: PortfolioData["experience"];
  onRef: (element: HTMLElement | null) => void;
}

export default function WorkSection({ experience, onRef }: WorkSectionProps) {
  return (
    <section
      id="work"
      ref={onRef}
      className="min-h-screen py-32 opacity-0"
    ></section>
  );
}
