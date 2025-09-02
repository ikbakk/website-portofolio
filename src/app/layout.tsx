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
		template: "%s | Iqbal Firdaus",
	},
	description:
		"Frontend developer crafting digital experiences at the intersection of design, technology, and human behavior.",
	keywords: [
		"software engineer",
		"frontend developer",
		"react",
		"typescript",
		"next.js",
		"design systems",
	],
	authors: [{ name: "Iqbal Firdausk" }],
	creator: "Iqbal Firdaus",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://ikbak.vercel.app",
		title: "Iqbal Firdaus - Portfolio",
		description:
			"Frontend developer crafting digital experiences at the intersection of design, technology, and human behavior.",
		siteName: "Iqbal Firdaus Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Iqbal Firdaus - Portfolio",
		description:
			"Frontend developer crafting digital experiences at the intersection of design, technology, and human behavior.",
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
