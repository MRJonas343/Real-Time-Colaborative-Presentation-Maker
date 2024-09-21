import { Action, CanvasElement } from "@/interfaces";
import { initialState } from "../state";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "@/Services";

export const onUndo = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (state.drawnElements.length > 0) {
		const lastElement = state.drawnElements[state.drawnElements.length - 1];
		dispatch({
			type: "SET_DELETED_ELEMENTS",
			payload: [...state.deletedElements, lastElement],
		});
		const newDrawnElements = state.drawnElements.slice(0, -1);
		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: newDrawnElements,
		});
		clearCanvas(ctx, canvasRef, newDrawnElements, drawElement);
	}
};
