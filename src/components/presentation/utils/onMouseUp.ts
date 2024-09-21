import { Action, CanvasElement } from "@/interfaces";
import { MouseEvent, RefObject } from "react";
import { initialState } from "..";

export const onMouseUp = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (state.editorMode === "rectangle") {
		const rect = canvasRef.current?.getBoundingClientRect();
		const x2 = e.clientX - (rect?.left || 0);
		const y2 = e.clientY - (rect?.top || 0);

		const newElement: CanvasElement = {
			x: state.startX,
			y: state.startY,
			x2: x2,
			y2: y2,
			width: Math.abs(x2 - state.startX),
			height: Math.abs(y2 - state.startY),
			color: "white",
			type: state.editorMode,
		};

		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: [...state.drawnElements, newElement],
		});
	}

	if (state.editorMode === "circle") {
		const rect = canvasRef.current?.getBoundingClientRect();
		const x2 = e.clientX - (rect?.left || 0);
		const y2 = e.clientY - (rect?.top || 0);

		const radius = Math.sqrt(
			(x2 - state.startX) ** 2 + (y2 - state.startY) ** 2,
		);

		const newElement: CanvasElement = {
			x: state.startX,
			y: state.startY,
			radius: radius,
			x2: x2,
			y2: y2,
			color: "white",
			type: state.editorMode,
		};

		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: [...state.drawnElements, newElement],
		});
	}

	dispatch({ type: "SET_IS_DRAWING", payload: false });
};
