import { Action } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { initialState } from "../state";
import { deleteCanvasElement } from "@/sockets/deleteElement";

export const deleteElement = (
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	if (!state.clickedCanvasElement) return;

	const newElements = state.drawnElements.filter(
		(elementDrawn) => elementDrawn.id !== state.clickedCanvasElement?.id,
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

	deleteCanvasElement(
		state.presentationId,
		state.clickedCanvasElement?.id,
		state.currentSlide,
	);

	clearCanvas(ctx, canvasRef, newElements);
};
