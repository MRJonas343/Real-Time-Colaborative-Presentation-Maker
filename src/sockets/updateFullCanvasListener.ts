import { initialState } from "@/components/presentation";
import { socket } from "@/constants";
import { Action, CanvasElement } from "@/interfaces";
import { clearCanvas } from "@/components/presentation";
import { RefObject } from "react";

export const updateFullCanvasListener = (
	dispatch: (value: Action) => void,
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,
) => {
	socket.on("updateFullCanvas", (data) => {
		const newElements = data.newElements as CanvasElement[];

		dispatch({ type: "SET_DRAWN_ELEMENTS", payload: newElements });
		if (newElements.length === 0) {
			ctx?.clearRect(
				0,
				0,
				canvasRef.current?.width || 0,
				canvasRef.current?.height || 0,
			);
		}
		clearCanvas(ctx, canvasRef, newElements);
	});
};
