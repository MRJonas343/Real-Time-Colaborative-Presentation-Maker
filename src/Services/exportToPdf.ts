import { initialState } from "@/components/presentation";
import { CanvasElement } from "@/interfaces";
import jsPDF from "jspdf";
import { RefObject } from "react";
import { clearCanvas } from "@/components/presentation";

export const exportToPdf = async (
	ctx: CanvasRenderingContext2D | undefined | null,
	canvasRef: RefObject<HTMLCanvasElement>,

	state: typeof initialState,
) => {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const data = await fetch(`${BASE_URL}/loby/getAllSlides`, {
		method: "GET",
		headers: {
			presentationId: state.presentationId,
			"Content-Type": "application/json",
		},
	});
	const slides = (await data.json()) as CanvasElement[][];

	const pdf = new jsPDF({
		orientation: "landscape",
		unit: "px",
		format: [canvasRef.current?.width || 0, canvasRef.current?.height || 0],
	});

	for (let i = 0; i < slides.length; i++) {
		clearCanvas(state, ctx, canvasRef, []);

		clearCanvas(state, ctx, canvasRef, slides[i]);

		const imgData = canvasRef.current?.toDataURL("image/jpeg", 1.0);

		if (imgData) {
			if (i > 0) {
				pdf.addPage();
			}
			pdf.addImage(
				imgData,
				"JPEG",
				0,
				0,
				canvasRef.current?.width || 0,
				canvasRef.current?.height || 0,
			);
		}

		clearCanvas(state, ctx, canvasRef, state.drawnElements);
	}

	//* Save the PDF
	pdf.save("presentation.pdf");
};
