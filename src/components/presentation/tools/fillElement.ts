import { Action } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { initialState } from "../state";

export const fillElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
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

	clearCanvas(ctx, canvasRef, newElements);
};
