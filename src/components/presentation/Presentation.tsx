"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SlidePreview, Toolbar, UserProfile } from ".";
import { changeEditorMode, changeUserRole } from "@/Services";
import { users, slidePreviewsExample } from "@/constants";
import { use, useEffect, useReducer, useRef, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { Button, Divider } from "@nextui-org/react";
import { updateSlidesPositions, drawElement } from "@/Services";
import { reducer, initialState } from "./state";
import { SlideExample } from "@/interfaces";
import { useDndSensors } from "@/hooks";

export const Presentation = () => {
	const [slidePreviews, setSlidePreviews] = useState<SlideExample[]>([]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const sensors = useDndSensors();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = canvasRef.current?.getContext("2d");

	const onUndo = () => {
		console.log("Undoing");
		drawElement(ctx, {
			x: 10,
			y: 10,
			width: 40,
			height: 25,
			color: "red",
			type: "rect",
		});
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
				changeEditorMode={changeEditorMode}
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
					id="canvas"
					ref={canvasRef}
					className="w-[70%] border-b-3 max-h-[90vh]"
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
