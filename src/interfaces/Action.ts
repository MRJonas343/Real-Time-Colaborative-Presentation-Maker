import { CanvasElement, EditorModes, Role, SlideExample } from ".";

export type Action =
	| { type: "SET_EDITOR_MODE"; payload: EditorModes }
	| { type: "SET_CREATOR"; payload: string }
	| { type: "SET_ID"; payload: string }
	| { type: "SET_TOPIC"; payload: string }
	| { type: "SET_CURRENT_SLIDE"; payload: number }
	| { type: "SET_TOTAL_SLIDES"; payload: number }
	| { type: "SET_ROLE"; payload: Role }
	| { type: "SET_IS_LOADING"; payload: boolean }
	| { type: "SET_START_X"; payload: number }
	| { type: "SET_START_Y"; payload: number }
	| { type: "SET_IS_DRAWING"; payload: boolean }
	| { type: "SET_SLIDES_PREVIEWS"; payload: SlideExample[] }
	| { type: "SET_DRAWN_ELEMENTS"; payload: CanvasElement[] }
	| { type: "SET_DELETED_ELEMENTS"; payload: CanvasElement[] }
	| { type: "SET_IS_DROP_DOWN_MENU_OPEN"; payload: boolean }
	| { type: "SET_DROP_DOWN_MENU_X"; payload: number }
	| { type: "SET_DROP_DOWN_MENU_Y"; payload: number }
	| { type: "SET_CLICKED_CANVAS_ELEMENT"; payload: CanvasElement | null }
	| { type: "SET_SELECTED_STROKE_COLOR"; payload: string }
	| { type: "SET_MODIFIED_ELEMENT"; payload: CanvasElement | null }
	| { type: "SET_IS_EDITING"; payload: boolean }
	| { type: "SET_TEXT_FIELD_X"; payload: number }
	| { type: "SET_TEXT_FIELD_Y"; payload: number }
	| { type: "SET_EDITED_TEXT_ELEMENT"; payload: CanvasElement | null }
	| { type: "SET_TEXT_FIELD_VALUE"; payload: string };
