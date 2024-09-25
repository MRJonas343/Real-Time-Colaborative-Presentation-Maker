import { Action } from "@/interfaces";
import { initialState } from ".";
import { RefObject } from "react";
import { FocusEvent } from "react";

interface TextAreaProps {
	state: typeof initialState;
	dispatch: (value: Action) => void;
	textAreRef: RefObject<HTMLTextAreaElement>;
	handleTextChange: () => void;
}

export const TextArea = ({
	state,
	dispatch,
	textAreRef,
	handleTextChange,
}: TextAreaProps) => {
	return (
		<>
			{state.isEditing && (
				<textarea
					ref={textAreRef}
					className="min-w-60 p-2 rounded-md absolute z-50 bg-transparent"
					style={{
						position: "absolute",
						left: state.textFieldX - 8,
						top: state.textFieldY - 26,
						fontSize: "16",
						color: "white",
						fontFamily: "Arial",
						resize: "both",
					}}
					value={state.textFieldValue}
					onChange={(e) => {
						dispatch({ type: "SET_TEXT_FIELD_VALUE", payload: e.target.value });
						//*How can I add  line break to the render content in the canvas?
						//* every time I listen an enter, i will create a new line
						//*But how I will identify the end of the line?, well with the previus word?
						//* I will need to store the previus word in the state
						//* and then I will check if the current word is the same as the previus word
						//* if it is, I will add a new line
					}}
					onBlur={() => {
						handleTextChange();
					}}
				/>
			)}
		</>
	);
};
