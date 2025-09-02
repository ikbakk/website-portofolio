import PortfolioClient from "../components/PortfolioClient";
import { portfolioData } from "../lib/data";

export default function Home() {
	return <PortfolioClient data={portfolioData} />;
}
