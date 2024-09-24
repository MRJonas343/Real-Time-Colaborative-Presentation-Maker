import { MouseEvent, RefObject } from "react";
import { clearCanvas, drawElement } from ".";
import { initialState } from "..";
import { Action } from "@/interfaces";

export const onMouseMove = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	canvasRef: RefObject<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | undefined | null,
	dispatch: (value: Action) => void,
) => {
	if (!canvasRef.current || !ctx || state.isDropDownMenuOpen) return;

	const rect = canvasRef.current.getBoundingClientRect();
	const x2 = e.clientX - (rect.left || 0);
	const y2 = e.clientY - (rect.top || 0);

	if (state.editorMode === "cursor" && state.clickedCanvasElement) {
		//*Fist scaliling
		if (e.ctrlKey) {
			const dx = x2 - state.startX;
			const dy = y2 - state.startY;

			const updatedElement = {
				...state.clickedCanvasElement,
				width: state.clickedCanvasElement.width + dx,
				height: state.clickedCanvasElement.height + dy,
				x2:
					state.clickedCanvasElement.x +
					(state.clickedCanvasElement.width + dx),
				y2:
					state.clickedCanvasElement.y +
					(state.clickedCanvasElement.height + dy),
			};

			const newElements = state.drawnElements.map((element) =>
				element.id === updatedElement.id ? updatedElement : element,
			);

			dispatch({ type: "SET_MODIFIED_ELEMENT", payload: updatedElement });
			dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });

			clearCanvas(ctx, canvasRef, newElements);

			return;
		}

		//*Rotating element
		if (e.altKey) {
			const dx =
				x2 -
				(state.clickedCanvasElement.x + state.clickedCanvasElement.width / 2);
			const dy =
				y2 -
				(state.clickedCanvasElement.y + state.clickedCanvasElement.height / 2);

			const angle = Math.atan2(dy, dx);

			const updatedElement = {
				...state.clickedCanvasElement,
				rotation: angle,
			};

			const newElements = state.drawnElements.map((element) =>
				element.id === updatedElement.id ? updatedElement : element,
			);

			dispatch({ type: "SET_MODIFIED_ELEMENT", payload: updatedElement });
			dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });

			clearCanvas(ctx, canvasRef, newElements);

			return;
		}

		//*Move eleemnt
		if (e.shiftKey) {
			const dx = x2 - state.startX;
			const dy = y2 - state.startY;

			const updatedElement = {
				...state.clickedCanvasElement,
				x: state.clickedCanvasElement.x + dx,
				y: state.clickedCanvasElement.y + dy,
				x2: state.clickedCanvasElement.x2 + dx,
				y2: state.clickedCanvasElement.y2 + dy,
			};

			const newElements = state.drawnElements.map((element) =>
				element.id === updatedElement.id ? updatedElement : element,
			);

			dispatch({ type: "SET_MODIFIED_ELEMENT", payload: updatedElement });
			dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });

			clearCanvas(ctx, canvasRef, newElements);

			return;
		}
	}

	//*Logic to draw the element
	if (!state.isDrawing) return;

	const width = x2 - state.startX;
	const height = y2 - state.startY;
	const radius = Math.sqrt((x2 - state.startX) ** 2 + (y2 - state.startY) ** 2);

	clearCanvas(ctx, canvasRef, state.drawnElements);

	drawElement(ctx, {
		id: "0",
		x: state.startX,
		y: state.startY,
		x2: x2,
		y2: y2,
		radius: radius,
		width: width,
		height: height,
		color: state.selectedStrokeColor,
		type: state.editorMode,
	});
};
