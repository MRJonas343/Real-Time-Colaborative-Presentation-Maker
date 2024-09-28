import { Action } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { initialState } from "../state";
import { updateCanvasElements } from "@/sockets";

export const fillElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	if (!state.clickedCanvasElement) return;
	const newElement = {
		...state.clickedCanvasElement,
		fillColor: state.selectedStrokeColor,
	};

	const newElements = state.drawnElements.map((element) => {
		if (element.id === newElement.id) {
			return newElement;
		}
		return element;
	});

	dispatch({
		type: "SET_DRAWN_ELEMENTS",
		payload: newElements,
	});

	updateCanvasElements(state.currentSlide, newElement, state.presentationId);

	clearCanvas(ctx, canvasRef, newElements);
};
