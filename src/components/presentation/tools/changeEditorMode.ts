import { Action, EditorModes } from "@/interfaces";
import { initialState } from "../state";
import { canvasZoom } from "./canvasZoom";

export const changeEditorMode = (
	ctx: CanvasRenderingContext2D | undefined | null,
	state: typeof initialState,
	mode: EditorModes,
	dispatch: (value: Action) => void,
) => {
	if (state.role === "viewer") return;

	if (state.editorMode !== "cursor") {
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });
		dispatch({ type: "SET_CLICKED_CANVAS_ELEMENT", payload: null });
	}

	if (mode === "cursor") {
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });
	}

	dispatch({ type: "SET_EDITOR_MODE", payload: mode });

	if (mode === "zoomin") {
		dispatch({ type: "SET_SCALE", payload: state.scale + 0.1 });
		canvasZoom(ctx, state.scale, state);
	} else if (mode === "zoomout") {
		dispatch({ type: "SET_SCALE", payload: state.scale - 0.1 });
		canvasZoom(ctx, state.scale, state);
	}
};
