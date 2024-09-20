"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { GalleryExample } from "@/constants/GalleryExample";
import { GalleryProps } from "@/interfaces/GalleryProps";
import { Image } from "@nextui-org/react";
import { FC } from "react";
import { Skeleton } from "@nextui-org/react";

export const Gallery: FC<GalleryProps> = ({ displayModal, isLoading }) => {
	return (
		<div className="grid gap-6 grid-col-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 place-items-center">
			{GalleryExample.map((item) => (
				<Card
					id={String(item.id)}
					onClick={() => displayModal(String(item.id))}
					key={item.id}
					className="py-4 lg:w-56 mb-6"
					shadow="md"
					isHoverable
					isPressable
				>
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<Skeleton className="rounded-lg" isLoaded={!isLoading}>
							<p className="text-tiny uppercase font-bold"> # {item.id}</p>
						</Skeleton>
						<Skeleton className="rounded-lg" isLoaded={!isLoading}>
							<small className="text-default-500">
								{item.peopleEditing} people connected
							</small>
						</Skeleton>
						<Skeleton className="rounded-lg w-6" isLoaded={!isLoading}>
							<h4 className="font-bold text-large">{item.title}</h4>
						</Skeleton>
					</CardHeader>
					<CardBody className="py-2">
						<Image
							isLoading={isLoading}
							alt="Card background"
							radius="sm"
							className="w-full"
							src={"https://nextui.org/images/hero-card-complete.jpeg"}
						/>
					</CardBody>
				</Card>
			))}
		</div>
	);
};
