import { EditorModes, Role } from ".";

export type Action =
	| { type: "SET_EDITOR_MODE"; payload: EditorModes }
	| { type: "SET_CREATOR"; payload: string }
	| { type: "SET_ID"; payload: string }
	| { type: "SET_TOPIC"; payload: string }
	| { type: "SET_CURRENT_SLIDE"; payload: number }
	| { type: "SET_TOTAL_SLIDES"; payload: number }
	| { type: "SET_ROLE"; payload: Role }
	| { type: "SET_IS_LOADING"; payload: boolean };
