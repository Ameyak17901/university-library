import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({ id, title, genre, coverColor, coverUrl }: Book) => {
  const isLoanedBook = false;
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover
          className="z-10"
          coverColor={coverColor}
          coverImage={coverUrl}
        />
      </Link>
      <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      {isLoanedBook && (
        <div className="w-full mt-3">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />

            <p className="text-light-100 ">11 days to return</p>
          </div>
          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </li>
  );
};

export default BookCard;
