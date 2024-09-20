import { EditorModes } from "@/interfaces";

export const initialState = {
	editorMode: "cursor" as EditorModes,
	presentationCreator: "",
	presentationId: "",
	presentationTopic: "",
	currentSlide: 1,
	totalSlides: 10,
	role: "Viewer" as "Viewer" | "Creator" | "Editor",
	isLoading: true,
};
