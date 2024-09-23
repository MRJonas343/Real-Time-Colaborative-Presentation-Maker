import { Action, CanvasElement } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "./DrawElements";

export const deleteElement = (
	element: CanvasElement,
	drawnElements: CanvasElement[],
	deletedElements: CanvasElement[],
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	const newElements = drawnElements.filter(
		(elementDrawn) => elementDrawn.id !== element.id,
	);
	const newDeletedElements = [...deletedElements, element];

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
