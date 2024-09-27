import { initialState } from "@/components/presentation";
import { Action } from "./Action";

export interface DropdownProps {
	state: typeof initialState;
	changeStroke: () => void;
	deleteElement: () => void;
	bringToFront: () => void;
	sendToBack: () => void;
	fillElement: () => void;
}

export interface SlideDropDownProps {
	state: typeof initialState;
	deleteElement: () => void;
	dispatch: (value: Action) => void;
}
