import { initialState } from "@/components/presentation";

export interface DropdownProps {
	state: typeof initialState;
	changeStrokeColorOfElement: () => void;
	deleteElement: () => void;
	bringToFront: () => void;
	sendToBack: () => void;
	fillElement: () => void;
}
