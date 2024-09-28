import { Action } from "@/interfaces";
import { clearCanvas } from "./clearCanvas";
import { initialState } from "../state";
import { RefObject } from "react";
import { updateCanvasElements } from "@/sockets";

export const changeStrokeColorOfElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	if (!state.clickedCanvasElement) return;

	const newElement = {
		...state.clickedCanvasElement,
		color: state.selectedStrokeColor,
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
