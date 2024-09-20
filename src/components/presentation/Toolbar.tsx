"use client";

import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { GiArrowCursor } from "react-icons/gi";
import { CiText } from "react-icons/ci";
import { GoArrowDownRight } from "react-icons/go";
import { FaSquare, FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { PresentationToolbarProps } from "@/interfaces";
import { RiPencilFill } from "react-icons/ri";

export const Toolbar: FC<PresentationToolbarProps> = ({
	onUndo,
	onReundo,
	changeEditorMode,
	presentationTopic,
	presentationCreator,
	presentationId,
	presentationCurrentSlide,
	presentationTotalSlides,
	role,
}) => {
	return (
		<header className="w-full h-24 flex">
			<div className="border-b-2 w-[15%] flex justify-center gap-6 items-center">
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={onUndo}
				>
					<PiArrowCounterClockwiseBold size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={onReundo}
				>
					<PiArrowClockwiseBold size={40} />
				</Button>
			</div>

			<div className="w-[35%] border-b-2 flex justify-center gap-3 items-center">
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("cursor")}
				>
					<GiArrowCursor size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("pencil")}
				>
					<RiPencilFill size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("text")}
				>
					<CiText size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("circle")}
				>
					<FaCircle size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("arrow")}
				>
					<GoArrowDownRight size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant="faded"
					onClick={() => changeEditorMode("rectangle")}
				>
					<FaSquare size={40} />
				</Button>
			</div>

			<div className="w-[30%] flex flex-col justify-center p-5 border-b-2">
				<div className="flex justify-around px-3">
					<p>{presentationTopic}</p>
					<p>ID # {presentationId}</p>
				</div>
				<div className="flex justify-around px-3">
					<div>By : {presentationCreator}</div>

					<div>
						Slide : {presentationCurrentSlide}/{presentationTotalSlides}
					</div>
				</div>
			</div>

			<div className="w-[20%] flex justify-around items-center border-b-2">
				<Button
					radius="sm"
					color="danger"
					startContent={<FaDownload size={20} />}
				>
					Export to PDF
				</Button>
				<Button isIconOnly radius="sm" size="lg" variant="faded">
					<FaRegQuestionCircle size={30} />
				</Button>
			</div>
		</header>
	);
};
