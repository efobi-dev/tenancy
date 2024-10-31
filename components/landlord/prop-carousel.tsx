"use client";

import type { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

export function PropImages({ images }: { images: ImageType[] | undefined }) {
	if (!images?.length) return null;

	return (
		<Carousel className="w-full mx-auto relative">
			<CarouselContent>
				{images.map((image) => (
					<CarouselItem key={image.id} className="relative aspect-video">
						<div className="w-full h-full relative rounded-lg overflow-hidden">
							<Image
								src={image.url}
								alt={image.caption ?? "property image"}
								sizes="(max-width: 768px) 100vw, 800px"
								fill
								className="object-cover"
								priority
								quality={100}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-4 hover:bg-black/70" />
			<CarouselNext className="absolute right-4 hover:bg-black/70" />
		</Carousel>
	);
}
