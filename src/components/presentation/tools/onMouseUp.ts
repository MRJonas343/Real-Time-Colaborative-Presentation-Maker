import { Action, CanvasElement } from "@/interfaces";
import { MouseEvent, RefObject } from "react";
import { initialState } from "..";
import { v4 as uuid } from "uuid";

export const onMouseUp = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (state.editorMode === "cursor" && state.clickedCanvasElement) {
		const updatedElement = state.drawnElements.find(
			(el) => el.id === state.clickedCanvasElement?.id,
		);

		if (updatedElement) {
			const updatedElements = state.drawnElements.map((el) =>
				el.id === updatedElement.id ? updatedElement : el,
			);

			dispatch({
				type: "SET_DRAWN_ELEMENTS",
				payload: updatedElements,
			});
		}

		dispatch({ type: "SET_CLICKED_CANVAS_ELEMENT", payload: null });

		return;
	}

	const rect = canvasRef.current?.getBoundingClientRect();
	const x2 = e.clientX - (rect?.left || 0);
	const y2 = e.clientY - (rect?.top || 0);
	const radius = Math.sqrt((x2 - state.startX) ** 2 + (y2 - state.startY) ** 2);

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
};
