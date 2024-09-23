import { Action, CanvasElement } from "@/interfaces";
import { initialState } from "..";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "./DrawElements";

export const sendToBack = (
	element: CanvasElement,
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	const newElements = state.drawnElements.filter(
		(elementDrawn) => elementDrawn.id !== element.id,
	);
	const newElementsWithElement = [element, ...newElements];

	dispatch({
		type: "SET_DRAWN_ELEMENTS",
		payload: newElementsWithElement,
	});

	clearCanvas(ctx, canvasRef, newElementsWithElement, drawElement);
};
