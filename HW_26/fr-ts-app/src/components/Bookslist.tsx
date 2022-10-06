import { Dispatch, FC, useEffect, useMemo, useState } from "react";
import { APIService, APIUserBooksList } from "../services/APIService";
import "./BooksStyle.css";
import UserBooks from "../redux/userBooks/userBooks";
import { connect } from "react-redux";
import { addBook, BookInformation, clearBooks } from "../redux/store/actions";
import { ActionTypes } from "../redux/store/types";

interface BookslistProps {
  addBook: (bookName: String, bookProgress: number) => void;
  clearBooks: () => void;
}

const Bookslist: FC<BookslistProps> = (Props) => {
  let _APIService: APIService = useMemo(() => new APIService(), []);

  const [booksList, setBooks] = useState<String[]>([]);

  useEffect(() => {
    _APIService.getAllBooks().then((resp) => {
      setBooks(resp.BookName);
    });

    _APIService.getUserBooks().then(function (resp: APIUserBooksList) {
      Props.clearBooks();
      resp.BookName.forEach(function (bookName: String, index: number) {
        Props.addBook(bookName, resp.BookProgress[index]);
      });
    });
  }, [_APIService, Props]);

  return (
    <>
      <div className="booksLeft">
        <h2 className="books-title">List of Books</h2>
        {booksList.map(function (bookName: String, bookID: number) {
          return (
            <div className="bookItem" key={`leftbooksID${bookID}`}>
              {bookName}
              <div
                className="favButton"
                onClick={() => {
                  _APIService.userAddBook({ BookName: bookName });
                  Props.addBook(bookName, 0);
                }}
              >
                ★
              </div>
            </div>
          );
        })}
      </div>

      <UserBooks />
    </>
  );
};

function mapDispatchToProps(
  dispatch: Dispatch<
    | {
        type: ActionTypes;
        BookInfo: BookInformation;
      }
    | { type: string }
  >
) {
  return {
    clearBooks: () => dispatch(clearBooks()),
    addBook: (BookName: String, BookProgress: number) =>
      dispatch(addBook({ BookName: BookName, BookProgress: BookProgress })),
  };
}

export default connect(null, mapDispatchToProps)(Bookslist);