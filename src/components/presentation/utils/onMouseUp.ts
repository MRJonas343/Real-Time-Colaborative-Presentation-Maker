import { Action, CanvasElement } from "@/interfaces";
import { MouseEvent, RefObject } from "react";
import { initialState } from "..";

export const onMouseUp = (
	e: MouseEvent<HTMLCanvasElement>,
	state: typeof initialState,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	const rect = canvasRef.current?.getBoundingClientRect();
	const x2 = e.clientX - (rect?.left || 0);
	const y2 = e.clientY - (rect?.top || 0);

	let newElement: CanvasElement | undefined;

	if (state.editorMode === "rectangle") {
		newElement = {
			x: state.startX,
			y: state.startY,
			x2: x2,
			y2: y2,
			width: Math.abs(x2 - state.startX),
			height: Math.abs(y2 - state.startY),
			color: "white",
			type: state.editorMode,
		};
	}

	if (state.editorMode === "circle") {
		const radius = Math.sqrt(
			(x2 - state.startX) ** 2 + (y2 - state.startY) ** 2,
		);

		newElement = {
			x: state.startX,
			y: state.startY,
			radius: radius,
			x2: x2,
			y2: y2,
			color: "white",
			type: state.editorMode,
		};
	}

	if (state.editorMode === "arrow") {
		newElement = {
			x: state.startX,
			y: state.startY,
			x2: x2,
			y2: y2,
			color: "white",
			type: state.editorMode,
		};
	}

	if (newElement) {
		dispatch({
			type: "SET_DRAWN_ELEMENTS",
			payload: [...state.drawnElements, newElement],
		});
	}

	dispatch({ type: "SET_IS_DRAWING", payload: false });
};
