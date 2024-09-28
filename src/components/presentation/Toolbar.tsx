"use client";

import { FaSquare, FaCircle, FaRegQuestionCircle } from "react-icons/fa";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { PresentationToolbarProps } from "@/interfaces";
import { Button, SelectItem, Select, Tooltip, Kbd } from "@nextui-org/react";
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
	exportToPDF,
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
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
					isDisabled={state.role === "viewer"}
					variant={state.editorMode === "rectangle" ? "shadow" : "faded"}
					color={state.editorMode === "rectangle" ? "primary" : "default"}
					onClick={() => changeEditorMode("rectangle")}
				>
					<FaSquare size={40} />
				</Button>
				<Select
					isDisabled={state.role === "viewer"}
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

			<div className="w-[30%] flex px-14 flex-col justify-center p-5 border-b-2 border-gray-700">
				<div className="flex justify-between items-start">
					<p>{state.presentationTopic}</p>
					<p>Presentation ID # {state.presentationId}</p>
				</div>
				<div className="flex justify-between">
					<div>By : {state.presentationCreator}</div>

					<div> Slide : {state.currentSlide}</div>
				</div>
			</div>
			<div className="w-[20%] flex justify-around items-center border-b-2 border-gray-700">
				<Button
					radius="sm"
					color="danger"
					variant="shadow"
					onClick={exportToPDF}
					startContent={<FaDownload size={20} />}
				>
					Export to PDF
				</Button>

				<Tooltip
					content={
						<div className="px-1 py-2">
							<div className="text-medium pb-1 font-bold">Hints</div>
							<div className="text-tiny font-light pb-1">
								<span className="font-bold">Move Elements : </span>
								Keep pressed the key{" "}
								<span className="font-extrabold">shift</span>
								<span className="pl-2">
									<Kbd keys={["shift"]} />
								</span>{" "}
								, hold the mouse over the element and move it
							</div>

							<div className="text-tiny font-light pb-1">
								<span className="font-bold">Rotate Elements : </span>
								Keep pressed the key
								<span className="pl-2 font-extrabold">alt</span> , hold the
								mouse over the element and rotate it.
							</div>

							<div className="text-tiny font-light pb-1">
								<span className="font-bold">Rezise Elements : </span>
								Keep pressed the key
								<span className="pl-1 font-extrabold">ctrl </span> or
								<span className="pl-1 font-extrabold">cmd</span>
								<span>
									<Kbd className="ml-1" keys={["command"]} />
								</span>
								, hold the mouse over the element and resize it.
							</div>

							<div className="text-tiny font-light">
								<span className="font-bold">Modified Elements : </span>
								Right click on the element and select what would you like to
								change, the current options are:
								<div className="pl-3 pt-1">
									<li>Color</li>
									<li>Stroke color</li>
									<li>Z-index</li>
									<li>Remove</li>
								</div>
							</div>
						</div>
					}
				>
					<Button isIconOnly radius="sm" size="lg" variant="faded">
						<FaRegQuestionCircle size={30} />
					</Button>
				</Tooltip>
			</div>
		</header>
	);
};
