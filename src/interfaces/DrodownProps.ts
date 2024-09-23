import { initialState } from "@/components/presentation";

export interface DropdownProps {
	state: typeof initialState;
	changeStroke: () => void;
	deleteElement: () => void;
	bringToFront: () => void;
	sendToBack: () => void;
	fillElement: () => void;
}
