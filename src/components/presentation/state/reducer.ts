import { Action } from "@/interfaces";
import { initialState } from "./initialStates";

export const reducer = (state: typeof initialState, action: Action) => {
	switch (action.type) {
		case "SET_EDITOR_MODE":
			return { ...state, editorMode: action.payload };
		case "SET_CREATOR":
			return { ...state, presentationCreator: action.payload };
		case "SET_ID":
			return { ...state, presentationId: action.payload };
		case "SET_TOPIC":
			return { ...state, presentationTopic: action.payload };
		case "SET_CURRENT_SLIDE":
			return { ...state, currentSlide: action.payload };
		case "SET_TOTAL_SLIDES":
			return { ...state, totalSlides: action.payload };
		case "SET_ROLE":
			return { ...state, role: action.payload };
		case "SET_IS_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_START_X":
			return { ...state, startX: action.payload };
		case "SET_START_Y":
			return { ...state, startY: action.payload };
		case "SET_IS_DRAWING":
			return { ...state, isDrawing: action.payload };
		case "SET_SLIDES_PREVIEWS":
			return { ...state, slidesPreviews: action.payload };
		case "SET_DRAWN_ELEMENTS":
			return { ...state, drawnElements: action.payload };
		case "SET_DELETED_ELEMENTS":
			return { ...state, deletedElements: action.payload };
		case "SET_IS_DROP_DOWN_MENU_OPEN":
			return { ...state, isDropDownMenuOpen: action.payload };
		case "SET_DROP_DOWN_MENU_X":
			return { ...state, dropDownMenuX: action.payload };
		case "SET_DROP_DOWN_MENU_Y":
			return { ...state, dropDownMenuY: action.payload };
		case "SET_CLICKED_CANVAS_ELEMENT":
			return { ...state, clickedCanvasElement: action.payload };
		case "SET_SELECTED_STROKE_COLOR":
			return { ...state, selectedStrokeColor: action.payload };
		case "SET_DRAGGING_ELEMENT":
			return { ...state, draggableElement: action.payload };

		default:
			return state;
	}
};
