import { Button } from "@nextui-org/react";
import { FC } from "react";
import { DropdownProps } from "@/interfaces";

export const Dropdown: FC<DropdownProps> = ({ state }) => {
	return (
		<div
			className={`${state.isDropDownMenuOpen && state.editorMode === "cursor" ? "block" : "hidden"} bg-[#18181b] w-40 h-auto p-2 rounded-xl absolute z-50`}
			style={{
				top: state.dropDownMenuY,
				left: state.dropDownMenuX,
			}}
		>
			<Button
				radius="sm"
				className="w-full bg-[#18181b] justify-start hover:border-1 border-gray-700"
			>
				Edit
			</Button>

			<Button
				radius="sm"
				className="w-full bg-[#18181b] justify-start hover:border-1 border-gray-700"
			>
				Chage Border
			</Button>
			<Button
				radius="sm"
				className="w-full bg-[#18181b] justify-start hover:border-1 border-gray-700"
			>
				Chage Color
			</Button>
			<Button
				radius="sm"
				className="w-full text-red-600 bg-[#18181b] justify-start hover:border-1 border-gray-700"
			>
				Delete
			</Button>
		</div>
	);
};
