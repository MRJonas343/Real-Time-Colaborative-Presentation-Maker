"use client";

import { chageStrokeColor, onMouseDown, onMouseMove, onMouseUp } from "./utils";
import { onReundo, onUndo } from "./utils";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { changeUserRole, updateSlidesPositions } from "@/Services";
import { users, slidePreviewsExample } from "@/constants";
import { Dropdown, SlidePreview, Toolbar, UserProfile } from ".";
import { useEffect, useReducer, useRef } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { Button, Divider } from "@nextui-org/react";
import { reducer, initialState } from "./state";
import { useDndSensors } from "@/hooks";

export const Presentation = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = canvasRef.current?.getContext("2d");
	const sensors = useDndSensors();

	useEffect(() => {
		dispatch({ type: "SET_CREATOR", payload: "John Smith" });
		dispatch({ type: "SET_ID", payload: "5242" });
		dispatch({ type: "SET_TOPIC", payload: "Enviroment Care" });
		dispatch({ type: "SET_CURRENT_SLIDE", payload: 1 });
		dispatch({ type: "SET_TOTAL_SLIDES", payload: 10 });
		dispatch({ type: "SET_ROLE", payload: "Creator" });
		dispatch({ type: "SET_IS_LOADING", payload: false });
		dispatch({ type: "SET_SLIDES_PREVIEWS", payload: slidePreviewsExample });
		if (typeof window !== "undefined") {
			if (canvasRef.current) {
				canvasRef.current.width = window.innerWidth * 0.7;
				canvasRef.current.height = window.innerHeight * 0.9;
			}
		}
	}, []);

	console.log("State:", state.selectedStrokeColor);

	return (
		<main className="min-h-screen flex flex-col h-auto">
			<Toolbar
				strokeColor={state.selectedStrokeColor}
				chageStrokeColor={(color) => chageStrokeColor(color, dispatch)}
				changeEditorMode={(mode) => {
					if (mode === "cursor") {
						dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });
					}
					dispatch({ type: "SET_EDITOR_MODE", payload: mode });
				}}
				onUndo={() => onUndo(state, dispatch, ctx, canvasRef)}
				onReundo={() => onReundo(state, dispatch, ctx, canvasRef)}
				editorMode={state.editorMode}
				presentationCreator={state.presentationCreator}
				presentationCurrentSlide={state.currentSlide}
				presentationId={state.presentationId}
				presentationTopic={state.presentationTopic}
				presentationTotalSlides={state.totalSlides}
				role={state.role}
			/>
			<section className="flex w-full h-screen flex-grow">
				<div className="w-[15%] border-r-2 border-gray-700 min-h-full h-auto overflow-y-auto scrollbar pb-32">
					<p className="text-center text-lg pt-2">Slides</p>
					<div className="flex pb-2 justify-center pt-4">
						<Button
							className="w-[80%]"
							color="primary"
							variant="shadow"
							radius="sm"
						>
							Add Slide
						</Button>
					</div>
					<DndContext
						autoScroll={false}
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={(e: DragEndEvent) =>
							updateSlidesPositions(
								e,
								(updatedSlides) =>
									dispatch({
										type: "SET_SLIDES_PREVIEWS",
										payload: updatedSlides,
									}),
								state.slidesPreviews,
							)
						}
					>
						<SortableContext items={state.slidesPreviews}>
							{state.slidesPreviews.map((item) => (
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

				<canvas
					ref={canvasRef}
					className="w-[70%] border-b-3 max-h-[90vh]"
					onMouseDown={(e) => onMouseDown(e, dispatch, canvasRef, state)}
					onMouseUp={(e) => onMouseUp(e, state, dispatch, canvasRef)}
					onMouseMove={(e) => onMouseMove(e, state, canvasRef, ctx)}
				/>

				<div className="w-[15%] border-l-2 border-gray-700 p-4 min-h-full h-auto scrollbar overflow-y-auto pb-32">
					<p>{state.presentationCreator}</p>
					<span className="text-sm text-gray-600">Creator</span>
					<Divider className="my-4 bg-gray-700 h-[2px] w-full mx-auto" />
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
			<Dropdown state={state} />
		</main>
	);
};
