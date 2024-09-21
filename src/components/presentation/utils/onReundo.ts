import { Action } from "@/interfaces";
import { initialState } from "..";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "@/Services";

export const onReundo = (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (state.deletedElements.length > 0) {
		const newDrawnElements = [
			...state.drawnElements,
			state.deletedElements[state.deletedElements.length - 1],
		];
		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: newDrawnElements,
		});

		const newDeletedElements = state.deletedElements.slice(0, -1);
		dispatch({
			type: "SET_DELETED_ELEMENTS",
			payload: newDeletedElements,
		});

		clearCanvas(ctx, canvasRef, newDrawnElements, drawElement);
	}
};
