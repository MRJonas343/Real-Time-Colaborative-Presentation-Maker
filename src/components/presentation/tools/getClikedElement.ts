import { initialState } from "..";

export const getClickedElement = (
	state: typeof initialState,
	x: number,
	y: number,
) => {
	const clickedElement = state.drawnElements.find((element) => {
		if (element.type === "rectangle") {
			return (
				x >= element.x &&
				x <= element.x + (element.width ?? 0) &&
				y >= element.y &&
				y <= element.y + (element.height ?? 0)
			);
		}

		if (element.type === "circle") {
			const distance = Math.sqrt((x - element.x) ** 2 + (y - element.y) ** 2);
			return distance <= (element.radius ?? 0);
		}

		if (element.type === "arrow") {
			const distance =
				Math.abs(
					(element.y2 - element.y) * x -
						(element.x2 - element.x) * y +
						element.x2 * element.y -
						element.y2 * element.x,
				) /
				Math.sqrt(
					(element.y2 - element.y) ** 2 + (element.x2 - element.x) ** 2,
				);

			const threshold = 5;
			return distance <= threshold;
		}

		return false;
	});
	return clickedElement;
};
