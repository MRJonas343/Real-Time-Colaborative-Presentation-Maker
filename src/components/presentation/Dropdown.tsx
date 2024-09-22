import { Button } from "@nextui-org/react";
import { FC } from "react";
import { DropdownProps } from "@/interfaces";
import { motion, AnimatePresence } from "framer-motion";

export const Dropdown: FC<DropdownProps> = ({ state }) => {
	return (
		<AnimatePresence>
			{state.isDropDownMenuOpen && state.editorMode === "cursor" && (
				<motion.div
					initial={{
						opacity: 0,
						scale: 0.5,
					}}
					animate={{
						opacity: 1,
						scale: 1,
					}}
					exit={{ opacity: 0, scale: 0.5 }}
					transition={{
						opacity: { duration: 0.3 },
						scale: { duration: 0.3 },
						ease: "easeInOut",
					}}
					style={{
						top: state.dropDownMenuY,
						left: state.dropDownMenuX,
					}}
					className="bg-[#18181b] w-40 h-auto p-2 rounded-xl absolute z-50"
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
				</motion.div>
			)}
		</AnimatePresence>
	);
};
