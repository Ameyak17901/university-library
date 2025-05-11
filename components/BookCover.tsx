import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "./BookCoverSvg";

type BookCoverVariants = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariants, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  coverColor: string;
  variant?: BookCoverVariants;
  coverImage: string;
}

const BookCover = ({
  className,
  coverColor = "#12B48",
  variant = "regular",
  coverImage = "https://placehold.co.in/400x600.png",
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "10%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="book cover"
          fill={true}
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BookCover;
