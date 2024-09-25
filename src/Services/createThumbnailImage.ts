import { RefObject } from "react";

export const createThumbnailImageInJPG = (
	canvasRef: RefObject<HTMLCanvasElement>,
	ctx: CanvasRenderingContext2D | undefined | null,
): string | undefined => {
	if (!canvasRef.current || !ctx) return;

	const canvas = canvasRef.current;

	return canvas.toDataURL("image/jpeg");
};
