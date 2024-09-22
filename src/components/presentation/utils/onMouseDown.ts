import { Action } from "@/interfaces";
import { MouseEvent, RefObject } from "react";
import { initialState } from "..";
import { getClickedElement } from ".";

export const onMouseDown = (
	e: MouseEvent<HTMLCanvasElement>,
	dispatch: (value: Action) => void,
	canvasRef: RefObject<HTMLCanvasElement>,
	state: typeof initialState,
) => {
	if (!canvasRef.current) return;

	const rect = canvasRef.current.getBoundingClientRect();

	const x = e.clientX - (rect.left || 0);
	const y = e.clientY - (rect.top || 0);
	const clickedElement = getClickedElement(state, x, y);

	console.log("Clicked element:", clickedElement);

	if (state.editorMode === "cursor") {
		if (clickedElement) {
			dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: true });
			dispatch({ type: "SET_DROP_DOWN_MENU_X", payload: e.clientX });
			dispatch({ type: "SET_DROP_DOWN_MENU_Y", payload: e.clientY });
			//*Con el elemento debo abrir un dropdown con las opciones de editar, borrar, etc.
			//* Y para persistir ese elemento necesito un estado que guarde el elemento actualmente seleccionado
			//* actualizar el estado de elementos con el nuevo elemento
			//* y llamar a la funcion de update para repintar el canvas
			return;
		}
		dispatch({ type: "SET_IS_DROP_DOWN_MENU_OPEN", payload: false });

		return;
	}

	dispatch({ type: "SET_IS_DRAWING", payload: true });
	dispatch({ type: "SET_START_X", payload: e.clientX - (rect?.left || 0) });
	dispatch({ type: "SET_START_Y", payload: e.clientY - (rect?.top || 0) });
};
