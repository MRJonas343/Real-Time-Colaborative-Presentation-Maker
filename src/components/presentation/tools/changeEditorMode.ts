import { Action, EditorModes } from "@/interfaces";
import { initialState } from "../state";

export const changeEditorMode = (
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
};
