export interface PresentationToolbarProps {
	onUndo: () => void;
	onReundo: () => void;
	presentationTopic: string;
	presentationCreator: string;
	presentationId: string;
	presentationCurrentSlide: number;
	presentationTotalSlides: number;
	presentationSlides?: unknown;
	role: "Creator" | "Viewer" | "Editor";
	editorMode: "text" | "circle" | "arrow" | "cursor" | "rectangle";
	changeEditorMode: (
		mode: "text" | "circle" | "arrow" | "cursor" | "rectangle",
	) => void;
}
