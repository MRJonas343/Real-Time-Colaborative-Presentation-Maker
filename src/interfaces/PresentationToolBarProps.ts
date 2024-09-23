import { Action, EditorModes } from "@/interfaces";
export interface PresentationToolbarProps {
	onUndo: () => void;
	onReundo: () => void;
	presentationTopic: string;
	presentationCreator: string;
	presentationId: string;
	presentationCurrentSlide: number;
	presentationTotalSlides: number;
	role: "Creator" | "Viewer" | "Editor";
	editorMode: EditorModes;
	strokeColor: string;
	chageStrokeColor: (color: string) => void;
	changeEditorMode: (mode: EditorModes) => void;
}
