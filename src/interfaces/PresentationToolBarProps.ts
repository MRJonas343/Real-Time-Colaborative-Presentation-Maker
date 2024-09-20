import { EditorModes } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";
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
	changeEditorMode: (mode: EditorModes) => void;
}
