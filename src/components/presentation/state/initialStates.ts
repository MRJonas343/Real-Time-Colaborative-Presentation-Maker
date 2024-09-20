export const initialState = {
	editorMode: "cursor" as "cursor" | "text" | "circle" | "arrow" | "rectangle",
	presentationCreator: "",
	presentationId: "",
	presentationTopic: "",
	currentSlide: 1,
	totalSlides: 10,
	role: "Viewer" as "Viewer" | "Creator" | "Editor",
	isLoading: true,
};
