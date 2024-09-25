import { Action, CanvasElement } from "@/interfaces";
import { MouseEvent, RefObject } from "react";
import { clearCanvas, drawElement, initialState } from "..";
import { v4 as uuid } from "uuid";

export const onMouseUp = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | undefined | null,
	textAreRef: RefObject<HTMLTextAreaElement>,
) => {
	if (!canvasRef.current || !state) return;

	//*Logic to draw the element
	const rect = canvasRef.current.getBoundingClientRect();
	const x2 = e.clientX - (rect.left || 0);
	const y2 = e.clientY - (rect.top || 0);
	const radius = Math.sqrt((x2 - state.startX) ** 2 + (y2 - state.startY) ** 2);

	if (state.editorMode === "text") {
		const newTextElement: CanvasElement = {
			id: uuid(),
			type: "text",
			x: x2,
			y: y2,
			x2: 0,
			y2: 0,
			color: "white",
			fontSize: 16,
			content: "",
			isEditing: true,
		};

		dispatch({ type: "SET_TEXT_FIELD_X", payload: e.clientX });
		dispatch({ type: "SET_TEXT_FIELD_Y", payload: e.clientY });
		dispatch({ type: "SET_EDITED_TEXT_ELEMENT", payload: newTextElement });
		dispatch({ type: "SET_IS_EDITING", payload: true });
		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: [...state.drawnElements, newTextElement],
		});

		setTimeout(() => {
			textAreRef.current?.focus();
		}, 100);

		return;
	}

	if (state.editorMode === "cursor" && state.clickedCanvasElement) {
		const newElements = state.drawnElements.map((element) =>
			element.id === state.modifiedElement?.id
				? state.modifiedElement
				: element,
		);

		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });
		dispatch({ type: "SET_CLICKED_CANVAS_ELEMENT", payload: null });
		dispatch({ type: "SET_MODIFIED_ELEMENT", payload: null });

		//TODO: actualizar el estado de los elementos que esten en la misma colaboracion

		return;
	}

	const newElement: CanvasElement = {
		id: uuid(),
		x: state.startX,
		y: state.startY,
		x2: x2,
		y2: y2,
		radius: radius,
		width: Math.abs(x2 - state.startX),
		height: Math.abs(y2 - state.startY),
		color: state.selectedStrokeColor,
		type: state.editorMode,
	};

	dispatch({
		type: "SET_DRAWN_ELEMENTS",
		payload: [...state.drawnElements, newElement],
	});

	dispatch({ type: "SET_IS_DRAWING", payload: false });

	//TODO: actualizar el estado de los elementos que esten en la misma colaboracion
};
