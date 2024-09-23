import { Action } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "./DrawElements";
import { initialState } from "../state";

export const deleteElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	const newElements = state.drawnElements.filter(
		(elementDrawn) => elementDrawn.id !== state.clickedCanvasElement.id,
	);
	const newDeletedElements = [
		...state.deletedElements,
		state.clickedCanvasElement,
	];

	dispatch({
		type: "SET_DRAWN_ELEMENTS",
		payload: newElements,
	});

	dispatch({
		type: "SET_DELETED_ELEMENTS",
		payload: newDeletedElements,
	});

	clearCanvas(ctx, canvasRef, newElements, drawElement);
};
