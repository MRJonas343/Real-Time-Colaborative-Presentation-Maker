"use client";

import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { GiArrowCursor } from "react-icons/gi";
import { CiText } from "react-icons/ci";
import { GoArrowDownRight } from "react-icons/go";
import { FaSquare, FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { Button, SelectItem } from "@nextui-org/react";
import { FC } from "react";
import { PresentationToolbarProps } from "@/interfaces";
import { Select } from "@nextui-org/react";

export const Toolbar: FC<PresentationToolbarProps> = ({
	onUndo,
	onReundo,
	changeEditorMode,
	presentationTopic,
	presentationCreator,
	presentationId,
	presentationCurrentSlide,
	presentationTotalSlides,
	editorMode,
	strokeColor,
	chageStrokeColor,
	role,
}) => {
	return (
		<header className="w-full h-24 flex">
			<div className="border-b-2 border-gray-700 w-[15%] flex justify-center gap-6 items-center">
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
			<div className="w-[35%] border-b-2 border-gray-700 flex justify-center gap-3 items-center">
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					color={editorMode === "cursor" ? "primary" : "default"}
					className="p-2"
					variant={editorMode === "cursor" ? "shadow" : "faded"}
					onClick={() => changeEditorMode("cursor")}
				>
					<GiArrowCursor size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={editorMode === "text" ? "shadow" : "faded"}
					color={editorMode === "text" ? "primary" : "default"}
					onClick={() => changeEditorMode("text")}
				>
					<CiText size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={editorMode === "circle" ? "shadow" : "faded"}
					color={editorMode === "circle" ? "primary" : "default"}
					onClick={() => changeEditorMode("circle")}
				>
					<FaCircle size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={editorMode === "arrow" ? "shadow" : "faded"}
					color={editorMode === "arrow" ? "primary" : "default"}
					onClick={() => changeEditorMode("arrow")}
				>
					<GoArrowDownRight size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={editorMode === "rectangle" ? "shadow" : "faded"}
					color={editorMode === "rectangle" ? "primary" : "default"}
					onClick={() => changeEditorMode("rectangle")}
				>
					<FaSquare size={40} />
				</Button>
				<Select
					radius="sm"
					defaultSelectedKeys={["white"]}
					onChange={(e) => chageStrokeColor(e.target.value)}
					style={{ height: 48 }}
					className={"w-32"}
					endContent={
						<div
							className="text-sm w-20 h-7 rounded-sm"
							style={{
								backgroundColor: strokeColor,
							}}
						/>
					}
					labelPlacement="inside"
					variant="faded"
				>
					<SelectItem key="white">White</SelectItem>
					<SelectItem key="Green">Green</SelectItem>
					<SelectItem key="Red">Red</SelectItem>
					<SelectItem key="Blue">Blue</SelectItem>
					<SelectItem key="Orange">Orange</SelectItem>
					<SelectItem key="Purple">Purple</SelectItem>
					<SelectItem key="Yellow">Yellow</SelectItem>
				</Select>
			</div>

			<div className="w-[30%] flex flex-col justify-center p-5 border-b-2 border-gray-700">
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
			<div className="w-[20%] flex justify-around items-center border-b-2 border-gray-700">
				<Button
					radius="sm"
					color="danger"
					variant="shadow"
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
