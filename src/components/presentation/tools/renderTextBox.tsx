import { CanvasElement } from "@/interfaces";
import { handleTextChange } from "./handleTextToChange";

const renderTextBox = (element: CanvasElement) => {
	if (element.isEditing) {
		return (
			<textarea
				style={{
					position: "absolute",
					top: element.y,
					left: element.x,
					fontSize: element.fontSize,
					color: element.color,
				}}
				value={element.content}
				onChange={(e) => handleTextChange(e.target.value, element.id)}
				onBlur={() => handleTextConfirm(element.id)}
				autoFocus
			/>
		);
	}

	return (
		<div
			style={{
				position: "absolute",
				top: element.y,
				left: element.x,
				fontSize: element.fontSize,
				color: element.color,
			}}
		>
			{element.content}
		</div>
	);
};
