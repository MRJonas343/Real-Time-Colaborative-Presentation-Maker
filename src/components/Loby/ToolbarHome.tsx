"use client";

import { ToolbarHomeProps } from "@/interfaces/ToolBarProps";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";

export const ToolbarHome: FC<ToolbarHomeProps> = ({
	onNewPresentation,
	onSearch,
	onSortBy,
}) => {
	return (
		<section className="w-[85%] mx-auto mt-8 flex justify-end gap-6">
			<Button
				onClick={onNewPresentation}
				radius="sm"
				variant="ghost"
				color="primary"
				className="w-28"
			>
				New Presentation
			</Button>
			{/* <label className="text-sm text-gray-500 self-center">Sort by</label>
			<Select
				aria-label="Sort by"
				defaultSelectedKeys={["Nothing"]}
				onChange={(e) => onSortBy(e.target.value)}
				className="w-36"
				labelPlacement="inside"
			>
				<SelectItem key="Nothing">Nothing</SelectItem>
				<SelectItem key="Recent">Recent</SelectItem>
				<SelectItem key="Oldest">Oldest</SelectItem>
				<SelectItem key="MoreSlides">More Slides</SelectItem>
				<SelectItem key="LessSlides">Less Slides</SelectItem>
			</Select> */}
			<Input
				onChange={(e) => onSearch(e.target.value)}
				className="w-56"
				endContent={<FaSearch />}
				label="Search"
				labelPlacement="outside-left"
			/>
		</section>
	);
};
