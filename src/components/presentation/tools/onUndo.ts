import { clearCanvas, drawElement } from ".";
import { initialState } from "../state";
import { Action } from "@/interfaces";
import { RefObject } from "react";

export const onUndo = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (state.drawnElements.length > 0) {
		const lastElement = state.drawnElements[state.drawnElements.length - 1];
		const newDrawnElements = state.drawnElements.slice(0, -1);

		dispatch({
			type: "SET_DELETED_ELEMENTS",
			payload: [...state.deletedElements, lastElement],
		});

		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: newDrawnElements,
		});

		clearCanvas(ctx, canvasRef, newDrawnElements, drawElement);
	}
};
