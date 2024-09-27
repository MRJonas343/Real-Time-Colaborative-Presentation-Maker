import { Button } from "@nextui-org/react";
import { FC } from "react";
import { SlideDropDownProps } from "@/interfaces";
import { motion, AnimatePresence } from "framer-motion";

export const SlideDropDown: FC<SlideDropDownProps> = ({
	state,
	deleteElement,
	dispatch,
}) => {
	return (
		<AnimatePresence>
			{state.isSlideMenuOpen && state.role === "creator" && (
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
						top: state.slideMenuY,
						left: state.slideMenuX,
					}}
					className="bg-[#18181b] w-40 h-auto p-2 rounded-md absolute z-50"
				>
					<Button
						onClick={deleteElement}
						radius="sm"
						className="w-full bg-[#18181b] justify-start hover:border-1 border-gray-700"
					>
						Delete Slide
					</Button>

					<Button
						onClick={() =>
							dispatch({ type: "SET_IS_SLIDE_MENU_OPEN", payload: false })
						}
						radius="sm"
						className="w-full bg-[#18181b] justify-start hover:border-1 border-gray-700"
					>
						Close Slide Menu
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
