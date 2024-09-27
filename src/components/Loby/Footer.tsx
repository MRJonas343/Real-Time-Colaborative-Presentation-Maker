import { Pagination } from "@nextui-org/pagination";
import { FC } from "react";

interface FooterProps {
	total: number;
	page: number;
	setPage: (page: number) => void;
}

export const Footer: FC<FooterProps> = ({ total, page, setPage }) => {
	return (
		<footer className="flex justify-center w-[85%] mx-auto">
			<Pagination
				siblings={3}
				showControls
				showShadow
				total={total}
				page={page}
				onChange={(newPage) => setPage(newPage)}
			/>
		</footer>
	);
};
