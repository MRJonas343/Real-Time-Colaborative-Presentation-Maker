import { Action } from "@/interfaces";
import { initialState } from "../state";
import { clearCanvas } from "./clearCanvas";
import { RefObject } from "react";

export const handleTextChange = async (
	state: typeof initialState,
	dispatch: (value: Action) => void,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	if (!state.textFieldValue || !state.editedTextElement) return;

	//*find the edited Element change the text and update the state
	const updatedElements = state.drawnElements.map((element) => {
		if (element.id === state.editedTextElement?.id) {
			return {
				...element,
				content: state.textFieldValue,
			};
		}
		return element;
	});

	//*if there are text elements witout content, delete them
	const newElements = updatedElements.filter(
		(element) => element.content !== "",
	);

	dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });
	dispatch({ type: "SET_IS_EDITING", payload: false });

	clearCanvas(ctx, canvasRef, newElements);
	dispatch({ type: "SET_EDITED_TEXT_ELEMENT", payload: null });
	dispatch({ type: "SET_TEXT_FIELD_VALUE", payload: "" });
};
