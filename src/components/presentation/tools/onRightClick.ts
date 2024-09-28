import { MouseEvent, RefObject } from "react";
import { getClickedElement, initialState } from "..";
import { Action } from "@/interfaces";

export const onRightClick = (
	e: MouseEvent<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
	state: typeof initialState,
	ctx: CanvasRenderingContext2D | undefined | null,
) => {
	e.preventDefault();
	if (!canvasRef.current || state.role === "viewer") return;

	const rect = canvasRef.current.getBoundingClientRect();

	const x = e.clientX - (rect.left || 0);
	const y = e.clientY - (rect.top || 0);
	const clickedElement = getClickedElement(ctx, state, x, y);

	if (!clickedElement) {
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });
		return;
	}

	if (state.editorMode === "cursor") {
		dispatch({ type: "SET_CLICKED_CANVAS_ELEMENT", payload: clickedElement });
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: true });
		dispatch({ type: "SET_DROP_DOWN_MENU_X", payload: e.clientX });
		dispatch({ type: "SET_DROP_DOWN_MENU_Y", payload: e.clientY });
		dispatch({ type: "SET_TEXT_FIELD_X", payload: e.clientX });
		dispatch({ type: "SET_TEXT_FIELD_Y", payload: e.clientY });
		dispatch({ type: "SET_IS_EDITING", payload: false });
	}
};
