"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (bookParams: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...bookParams,
        availableCopies: bookParams.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "an error ocurred while creating book",
    };
  }
};
