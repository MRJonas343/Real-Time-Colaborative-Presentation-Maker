import { Action, EditorModes } from "@/interfaces";

export const changeEditorMode = (
	mode: EditorModes,
	dispatch: (value: Action) => void,
) => {
	if (mode === "cursor") {
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });
	}
	dispatch({ type: "SET_EDITOR_MODE", payload: mode });
};
