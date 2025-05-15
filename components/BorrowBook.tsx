"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { borrowBook } from "@/lib/actions/book";
import { useRouter } from "next/navigation";

interface Props {
  bookId: string;
  userId: string;
  borrowEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({ bookId, userId, borrowEligibility }: Props) => {
  const { isEligible, message } = borrowEligibility;
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    setBorrowing(true);

    try {
      const response = await borrowBook({ userId, bookId });

      if (response.success) {
        toast({
          title: "Success",
          description: "Book borrowed succussfully...",
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: response?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "an error occurred while borrowing book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow"}
      </p>
    </Button>
  );
};

export default BorrowBook;
