"use client";

import { Image } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";
import { FC } from "react";
import { SlidePreviewType } from "@/interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SlidePreview: FC<SlidePreviewType> = ({
	slideId,
	isLoading,
	slidePreview,
	openSlideMenu,
	changeCurrentSlides,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: slideId });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			onContextMenu={(e) => openSlideMenu(e, slideId)}
			className="w-full flex justify-center p-4"
			onMouseUp={() => changeCurrentSlides(slideId)}
		>
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				id={slideId}
			>
				<Skeleton className="rounded-lg" isLoaded={!isLoading}>
					<Image
						radius="sm"
						className="w-36 h-20 border-blue-600 border-2"
						src={slidePreview}
						alt="Next.js logo"
					/>
				</Skeleton>
			</div>
		</div>
	);
};
