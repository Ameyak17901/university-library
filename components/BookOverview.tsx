import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverUrl,
  coverColor,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users?.id, userId))
    .limit(1);

  if (!user) return null;

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>Total Books: {totalCopies}</p>
          <p>Available Books: {availableCopies}</p>
        </div>

        <p className="book-description">{description}</p>
        <BorrowBook
          userId={userId}
          bookId={id}
          borrowEligibility={borrowingEligibility}
        />
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
