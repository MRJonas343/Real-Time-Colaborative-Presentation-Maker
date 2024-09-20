import { Providers } from "./providers";
import type { Metadata } from "next";
import { oswald } from "./fonts/font";
import "./globals.css";

export const metadata: Metadata = {
	title: "Task 6",
	description: "Colaborative Presentation Software",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={"dark"}>
			<body
				className={`${oswald.className} overflow-x-hidden lg:overflow-y-hidden antialiased h-auto pb-10 w-screen`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
