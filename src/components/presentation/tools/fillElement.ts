import { Action, CanvasElement } from "@/interfaces";
import { RefObject } from "react";
import { clearCanvas } from "./clearCanvas";
import { drawElement } from "./DrawElements";

export const fillElement = (
	selectedStrokeColor: string,
	element: CanvasElement,
	drawnElements: CanvasElement[],
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
) => {
	const newElement = {
		...element,
		fillColor: selectedStrokeColor,
	};

	const newElements = drawnElements.map((element) => {
		if (element.id === newElement.id) {
			return newElement;
		}
		return element;
	});

	dispatch({
		type: "SET_DRAWN_ELEMENTS",
		payload: newElements,
	});

	clearCanvas(ctx, canvasRef, newElements, drawElement);
};
