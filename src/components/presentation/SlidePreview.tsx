"use client";

import { IoTrash } from "react-icons/io5";
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
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: slideId });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			id={slideId}
			className="w-full flex h-28 items-center p-4 gap-4"
		>
			<Skeleton className="rounded-lg" isLoaded={!isLoading}>
				<Image
					radius="sm"
					className="w-36 h-20"
					src="https://nextui.org/images/hero-card-complete.jpeg"
					alt="Next.js logo"
				/>
			</Skeleton>

			<IoTrash color="#f31260" cursor="pointer" size={28} />
		</div>
	);
};
