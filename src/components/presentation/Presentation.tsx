"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import {
	changeUserRole,
	createThumbnailImageInJPG,
	updateSlidesPositions,
} from "@/Services";
import { Dropdown, SlidePreview, TextArea, Toolbar, UserProfile } from ".";
import { users, slidePreviewsExample, socket } from "@/constants";
import { useEffect, useReducer, useRef } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { Button, Divider } from "@nextui-org/react";
import { reducer, initialState } from "./state";
import { useDndSensors } from "@/hooks";
import { createPresentationListener } from "@/sockets";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as tools from "./tools";
import { SlideDropDown } from "./SlideDropDown";
import { setInitialData } from "./tools/setInitialData";
import type { LocalStoragePresentation } from "@/interfaces/LocalStoragePresentation";

export const Presentation = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const textAreRef = useRef<HTMLTextAreaElement>(null);
	const ctx = canvasRef.current?.getContext("2d");
	const { id } = useParams();
	const ID = id.toString();
	const router = useRouter();
	const sensors = useDndSensors();

	console.log(state.currentSlide);

	useEffect(() => {
		dispatch({ type: "SET_IS_LOADING", payload: true });
		const elements = localStorage.getItem("presentationes");
		if (!elements) return router.push("/loby");
		const parsedElements: LocalStoragePresentation[] = JSON.parse(elements);

		setInitialData(dispatch, parsedElements, ID);
		createPresentationListener(dispatch);

		if (typeof window !== "undefined" && canvasRef.current) {
			canvasRef.current.width = window.innerWidth * 0.7;
			canvasRef.current.height = window.innerHeight * 0.9;
		}

		return () => {
			socket.off("newElements");
			socket.off("presentationCreated");
		};
	}, []);

	return (
		<main className="min-h-screen flex flex-col h-auto">
			<Toolbar
				state={state}
				chageStrokeColor={(color) => tools.chageStrokeColor(color, dispatch)}
				changeEditorMode={(mode) =>
					tools.changeEditorMode(state, mode, dispatch)
				}
				onUndo={() => tools.onUndo(state, dispatch, ctx, canvasRef)}
				onReundo={() => tools.onReundo(state, dispatch, ctx, canvasRef)}
				exportToPDF={() => createThumbnailImageInJPG(canvasRef, ctx)}
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
							disabled={state.role === "Viewer" || state.role === "Editor"}
						>
							Add Slide
						</Button>
					</div>
					<DndContext
						autoScroll={false}
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={(e) => updateSlidesPositions(e, dispatch, state)}
					>
						<SortableContext
							disabled={state.role === "Viewer" || state.role === "Editor"}
							items={state.slidesPreviews}
						>
							{state.slidesPreviews.map((item) => (
								<SlidePreview
									isLoading={state.isLoading}
									key={item.id}
									slideId={item.id}
									slidePreview={item.slidePreview}
									openSlideMenu={(e, id) =>
										tools.openSlideMenu(e, id, dispatch)
									}
									changeCurrentSlides={(id) =>
										tools.changeCurrentSlide(state, dispatch, id)
									}
								/>
							))}
						</SortableContext>
					</DndContext>
				</div>

				<canvas
					ref={canvasRef}
					className="w-[70%] border-b-3 max-h-[90vh]"
					onMouseDown={(e) =>
						tools.onMouseDown(e, state, dispatch, canvasRef, ctx)
					}
					onMouseUp={(e) =>
						tools.onMouseUp(e, state, dispatch, canvasRef, ctx, textAreRef)
					}
					onMouseMove={(e) =>
						tools.onMouseMove(e, state, canvasRef, ctx, dispatch)
					}
					onContextMenu={(e) =>
						tools.onRightClick(e, dispatch, canvasRef, state, ctx)
					}
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
			<Dropdown
				state={state}
				bringToFront={() => tools.bringToFront(state, ctx, canvasRef, dispatch)}
				sendToBack={() => tools.sendToBack(state, ctx, canvasRef, dispatch)}
				changeStroke={() =>
					tools.changeStrokeColorOfElement(state, ctx, canvasRef, dispatch)
				}
				fillElement={() => tools.fillElement(state, ctx, canvasRef, dispatch)}
				deleteElement={() =>
					tools.deleteElement(state, ctx, canvasRef, dispatch)
				}
			/>
			<TextArea
				state={state}
				dispatch={dispatch}
				textAreRef={textAreRef}
				handleTextChange={() =>
					tools.handleTextChange(state, dispatch, ctx, canvasRef)
				}
			/>
			<SlideDropDown
				state={state}
				dispatch={dispatch}
				deleteElement={() =>
					tools.deleteElement(state, ctx, canvasRef, dispatch)
				}
			/>
		</main>
	);
};
