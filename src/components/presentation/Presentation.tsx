"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SlidePreview, Toolbar, UserProfile } from ".";
import { changeUserRole } from "@/Services";
import { users, slidePreviewsExample } from "@/constants";
import { useEffect, useReducer, useRef, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { Button, Divider } from "@nextui-org/react";
import { updateSlidesPositions, drawElement } from "@/Services";
import { reducer, initialState } from "./state";
import { SlideExample } from "@/interfaces";
import { useDndSensors } from "@/hooks";
import { MouseEvent } from "react";

export const Presentation = () => {
	const [slidePreviews, setSlidePreviews] = useState<SlideExample[]>([]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const sensors = useDndSensors();

	const [startX, setStartX] = useState(0);
	const [startY, setStartY] = useState(0);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = canvasRef.current?.getContext("2d");
	const [isDrawing, setIsDrawing] = useState<boolean>();

	const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(true);

		const rect = canvasRef.current?.getBoundingClientRect();
		setStartX(e.clientX - (rect?.left || 0));
		setStartY(e.clientY - (rect?.top || 0));
	};

	const onMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		setIsDrawing(false);
	};

	const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;
		if (state.editorMode !== "pencil") return;

		const rect = canvasRef.current?.getBoundingClientRect();
		const x2 = e.clientX - (rect?.left || 0);
		const y2 = e.clientY - (rect?.top || 0);

		drawElement(ctx, {
			x: startX,
			y: startY,
			x2: x2,
			y2: y2,
			width: 1,
			height: 1,
			color: "red",
			type: "pencil",
		});

		setStartX(x2);
		setStartY(y2);
	};

	const onUndo = () => {
		console.log("Undoing");
		// drawElement(ctx, {
		// 	x: 10,
		// 	y: 10,
		// 	width: 100,
		// 	height: 80,
		// 	color: "red",
		// 	type: "rect",
		// });
	};

	const onReundo = () => {
		console.log("Reunindo");
	};

	useEffect(() => {
		setTimeout(() => {
			dispatch({ type: "SET_CREATOR", payload: "John Smith" });
			dispatch({ type: "SET_ID", payload: "5242" });
			dispatch({ type: "SET_TOPIC", payload: "Enviroment Care" });
			dispatch({ type: "SET_CURRENT_SLIDE", payload: 1 });
			dispatch({ type: "SET_TOTAL_SLIDES", payload: 10 });
			dispatch({ type: "SET_ROLE", payload: "Creator" });
			dispatch({ type: "SET_IS_LOADING", payload: false });
			setSlidePreviews(slidePreviewsExample);
		}, 1000);
	}, []);

	return (
		<main className="min-h-screen flex flex-col h-auto">
			{/* Toolbar */}
			<Toolbar
				changeEditorMode={(mode) => {
					dispatch({ type: "SET_EDITOR_MODE", payload: mode });
				}}
				onUndo={onUndo}
				onReundo={onReundo}
				editorMode={state.editorMode}
				presentationCreator={state.presentationCreator}
				presentationCurrentSlide={state.currentSlide}
				presentationId={state.presentationId}
				presentationTopic={state.presentationTopic}
				presentationTotalSlides={state.totalSlides}
				role={state.role}
			/>
			<section className="flex w-full h-screen flex-grow">
				{/* Sidebar */}
				<div className="w-[15%] border-r-2 min-h-full h-auto overflow-y-auto scrollbar pb-32">
					<p className="text-center text-lg pt-2">Slides</p>
					<div className="flex pb-2 justify-center pt-4">
						<Button className="w-[80%]" color="primary" radius="sm">
							Add Slide
						</Button>
					</div>
					<DndContext
						autoScroll={false}
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={(e: DragEndEvent) =>
							updateSlidesPositions(e, setSlidePreviews)
						}
					>
						<SortableContext items={slidePreviews}>
							{slidePreviews.map((item) => (
								<SlidePreview
									isLoading={state.isLoading}
									key={item.id}
									slideId={item.id}
									slidePreview={item.slidePreview}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>

				{/* Main content */}
				<canvas
					style={{ backgroundColor: "white" }}
					width={window.innerWidth * 0.7 ?? 1}
					height={window.innerHeight * 0.9 ?? 1}
					ref={canvasRef}
					className="w-[70%] border-b-3 max-h-[90vh]"
					onMouseDown={onMouseDown}
					onMouseUp={onMouseUp}
					onMouseMove={onMouseMove}
				/>

				{/* User section */}
				<div className="w-[15%] border-l-2 p-4 min-h-full h-auto scrollbar overflow-y-auto pb-32">
					<p>{state.presentationCreator}</p>
					<span className="text-sm text-gray-600">Creator</span>
					<Divider className="my-4 bg-white h-1 w-full mx-auto" />
					{users.map((user) => (
						<UserProfile
							id={user.id}
							key={user.id}
							userName={user.userName}
							role={user.role}
							changeRole={changeUserRole}
						/>
					))}
				</div>
			</section>
		</main>
	);
};
