import { Pagination } from "@nextui-org/pagination";
import { FC } from "react";

interface FooterProps {
	total: number;
	onPageChange: (page: number) => void;
}

export const Footer: FC<FooterProps> = ({ total, onPageChange }) => {
	return (
		<footer className="flex justify-center w-[85%] mx-auto">
			<Pagination
				siblings={3}
				showControls
				showShadow
				total={total}
				initialPage={1}
				onChange={(page) => {
					onPageChange(page);
				}}
			/>
		</footer>
	);
};
