import { Action } from "@/interfaces";
import { MouseEvent, RefObject } from "react";

export const onMouseDown = (
	e: MouseEvent<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (!canvasRef.current) return;

	const rect = canvasRef.current.getBoundingClientRect();

	dispatch({ type: "SET_IS_DRAWING", payload: true });
	dispatch({ type: "SET_START_X", payload: e.clientX - (rect?.left || 0) });
	dispatch({ type: "SET_START_Y", payload: e.clientY - (rect?.top || 0) });
};
