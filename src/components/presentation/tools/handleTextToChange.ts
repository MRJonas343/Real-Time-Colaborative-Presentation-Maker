import { Action } from "@/interfaces";
import { initialState } from "../state";
import { clearCanvas } from "./clearCanvas";
import { RefObject } from "react";

export const handleTextChange = (
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

	dispatch({ type: "SET_DRAWN_ELEMENTS", payload: updatedElements });
	dispatch({ type: "SET_IS_EDITING", payload: false });

	clearCanvas(ctx, canvasRef, updatedElements);
	dispatch({ type: "SET_EDITED_TEXT_ELEMENT", payload: null });
	dispatch({ type: "SET_TEXT_FIELD_VALUE", payload: "" });

	//TODO: there is a wird bug, it basically dont update the drawnelement state to the new one without the text  elements without contents
};
