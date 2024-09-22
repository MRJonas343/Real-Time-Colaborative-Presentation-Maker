import { CanvasElement, EditorModes, SlideExample } from "@/interfaces";

export const initialState = {
	editorMode: "cursor" as EditorModes,
	presentationCreator: "",
	presentationId: "",
	presentationTopic: "",
	currentSlide: 1,
	totalSlides: 10,
	role: "Viewer" as "Viewer" | "Creator" | "Editor",
	isLoading: true,
	startX: 0,
	startY: 0,
	isDrawing: false,
	slidesPreviews: [] as SlideExample[],
	drawnElements: [] as CanvasElement[],
	deletedElements: [] as CanvasElement[],
	isDropDownMenuOpen: false,
	dropDownMenuX: 100,
	dropDownMenuY: 100,
};
