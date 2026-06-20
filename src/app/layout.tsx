import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: {
		default: "Muhammad Iqbal Firdaus - Portfolio",
		template: "%s | Muhammad Iqbal Firdaus",
	},
	description:
		"Frontend & mobile developer building modern web and mobile experiences with performance-focused UI and clean developer workflows.",
	keywords: [
		"software engineer",
		"frontend developer",
		"react",
		"typescript",
		"next.js",
		"design systems",
	],
	authors: [{ name: "Muhammad Iqbal Firdaus" }],
	creator: "Muhammad Iqbal Firdaus",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://ikbak.vercel.app",
		title: "Muhammad Iqbal Firdaus - Portfolio",
		description:
			"Frontend & mobile developer building modern web and mobile experiences with performance-focused UI and clean developer workflows.",
		siteName: "Muhammad Iqbal Firdaus Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Muhammad Iqbal Firdaus - Portfolio",
		description:
			"Frontend & mobile developer building modern web and mobile experiences with performance-focused UI and clean developer workflows.",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.variable} suppressHydrationWarning>
			<body className="font-sans antialiased">{children}</body>
		</html>
	);
}
