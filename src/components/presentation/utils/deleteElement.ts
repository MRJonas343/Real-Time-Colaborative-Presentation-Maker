import { Action, CanvasElement } from "@/interfaces";
import { initialState } from "..";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "./DrawElements";

export const deleteElement = (
	element: CanvasElement,
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	const newElements = state.drawnElements.filter(
		(elementDrawn) => elementDrawn.id !== element.id,
	);
	const newDeletedElements = [...state.deletedElements, element];

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
