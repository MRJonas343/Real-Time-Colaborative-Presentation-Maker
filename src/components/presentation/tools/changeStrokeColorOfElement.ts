import { Action } from "@/interfaces";
import { clearCanvas } from "./clearCanvas";
import { initialState } from "../state";
import { RefObject } from "react";

export const changeStrokeColorOfElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
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

	clearCanvas(ctx, canvasRef, newElements);

	//TODO : actualizar los elementos que esten en la misma colaboracion
};
