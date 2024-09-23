"use client";

import { FaSquare, FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { PresentationToolbarProps } from "@/interfaces";
import { Button, SelectItem, Select } from "@nextui-org/react";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { GoArrowDownRight } from "react-icons/go";
import { GiArrowCursor } from "react-icons/gi";
import { FaDownload } from "react-icons/fa";
import { CiText } from "react-icons/ci";
import { FC } from "react";

export const Toolbar: FC<PresentationToolbarProps> = ({
	onUndo,
	onReundo,
	changeEditorMode,
	chageStrokeColor,
	state,
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
					color={state.editorMode === "cursor" ? "primary" : "default"}
					className="p-2"
					variant={state.editorMode === "cursor" ? "shadow" : "faded"}
					onClick={() => changeEditorMode("cursor")}
				>
					<GiArrowCursor size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={state.editorMode === "text" ? "shadow" : "faded"}
					color={state.editorMode === "text" ? "primary" : "default"}
					onClick={() => changeEditorMode("text")}
				>
					<CiText size={40} />
				</Button>

				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={state.editorMode === "circle" ? "shadow" : "faded"}
					color={state.editorMode === "circle" ? "primary" : "default"}
					onClick={() => changeEditorMode("circle")}
				>
					<FaCircle size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={state.editorMode === "arrow" ? "shadow" : "faded"}
					color={state.editorMode === "arrow" ? "primary" : "default"}
					onClick={() => changeEditorMode("arrow")}
				>
					<GoArrowDownRight size={40} />
				</Button>
				<Button
					radius="sm"
					isIconOnly
					size="lg"
					className="p-2"
					variant={state.editorMode === "rectangle" ? "shadow" : "faded"}
					color={state.editorMode === "rectangle" ? "primary" : "default"}
					onClick={() => changeEditorMode("rectangle")}
				>
					<FaSquare size={40} />
				</Button>
				<Select
					aria-label="Stroke color"
					radius="sm"
					defaultSelectedKeys={["White"]}
					onChange={(e) => chageStrokeColor(e.target.value)}
					style={{ height: 48 }}
					className={"w-36"}
					endContent={
						<div
							className="text-sm w-20 h-7 rounded-sm"
							style={{
								backgroundColor: state.selectedStrokeColor,
							}}
						/>
					}
					labelPlacement="inside"
					variant="faded"
				>
					<SelectItem key="White">White</SelectItem>
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
					<p>{state.presentationTopic}</p>
					<p>ID # {state.presentationId}</p>
				</div>
				<div className="flex justify-around px-3">
					<div>By : {state.presentationCreator}</div>

					<div>
						Slide : {state.currentSlide}/{state.totalSlides}
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
