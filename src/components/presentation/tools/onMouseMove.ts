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
		let updatedElement = { ...state.clickedCanvasElement };
		const dx = x2 - state.startX;
		const dy = y2 - state.startY;

		if (e.ctrlKey) {
			//* Resizing element
			updatedElement = {
				...updatedElement,
				width: updatedElement.width + dx,
				height: updatedElement.height + dy,
				x2: updatedElement.x + updatedElement.width + dx,
				y2: updatedElement.y + updatedElement.height + dy,
			};
		} else if (e.altKey) {
			//* Rotating element
			const centerX = updatedElement.x + updatedElement.width / 2;
			const centerY = updatedElement.y + updatedElement.height / 2;
			updatedElement.rotation = Math.atan2(y2 - centerY, x2 - centerX);
		} else if (e.shiftKey) {
			//* Moving element
			updatedElement = {
				...updatedElement,
				x: updatedElement.x + dx,
				y: updatedElement.y + dy,
				x2: updatedElement.x2 + dx,
				y2: updatedElement.y2 + dy,
			};
		} else {
			return;
		}

		const newElements = state.drawnElements.map((el) =>
			el.id === updatedElement.id ? updatedElement : el,
		);
		dispatch({ type: "SET_MODIFIED_ELEMENT", payload: updatedElement });
		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });

		clearCanvas(ctx, canvasRef, newElements);
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
