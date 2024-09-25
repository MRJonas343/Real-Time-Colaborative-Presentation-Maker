import { initialState } from "@/components/presentation";
import { EditorModes } from "@/interfaces";
export interface PresentationToolbarProps {
	state: typeof initialState;
	onUndo: () => void;
	onReundo: () => void;
	chageStrokeColor: (color: string) => void;
	changeEditorMode: (mode: EditorModes) => void;
	exportToPDF: () => void;
}
