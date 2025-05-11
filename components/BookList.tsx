import BookCard from "./BookCard";

interface Props {
  title: string;
  containerClassName?: string;
  books: Book[];
}

const BookList = ({ title, containerClassName, books }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-400">{title}</h2>

      <ul className="book-list">
        {books.map((book: Book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};

export default BookList;
