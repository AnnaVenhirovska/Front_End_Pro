import { Dispatch, FC, ReactElement, useState } from "react";
import { connect } from "react-redux";
import { BookInformation, ModifyBook, removeBook } from "../store/actions";
import APIService from "../../services/APIService";
import ModalScript from "../../components/ModalScript";
import { ActionTypes } from "../store/types";

let activateModal: Dispatch<React.SetStateAction<boolean>>,
  targetBook: String,
  modalProgress: number,
  _props: UserBooksProps;

interface UserBooksProps {
  booksList: BookInformation[];
  modifyBook: (BookName: String, Progress: number) => void;
  removeBook: (BookName: String) => void;
}
const UserBooks: FC<UserBooksProps> = (props) => {
  _props = props;

  const [modalState, setModalState] = useState<boolean>(false);
  activateModal = setModalState;

  let modalData: ReactElement | undefined;
  if (modalState) {
    modalData = (
      <ModalScript
        StartProgress={modalProgress}
        ConfirmCall={(e: number) => {
          SetBookProgress(e);
        }}
        DenyCall={() => {
          SetBookProgress(-1);
        }}
      />
    );
  }
  return (
    <div className="booksRight">
      <h2 className="books-title">Favorite Books</h2>
      {modalData}
      {props.booksList.map(function (BookInfo: BookInformation, index: number) {
        return (
          <div className="bookItem" key={`rightbooksID${index}`}>
            {BookInfo.BookName}
            <div
              className="removeBook"
              onClick={(e) => {
                APIService.userRemoveBook({ BookName: BookInfo.BookName });
                props.removeBook(BookInfo.BookName);
              }}
            >
              ✖
            </div>
            <div
              className="ProgressBar"
              style={{ width: `${BookInfo.BookProgress}%` }}
            ></div>
            <div
              className="progressIcon"
              onClick={() => {
                SetProgress(BookInfo.BookName, BookInfo.BookProgress);
              }}
            >
              &#9971;
            </div>
          </div>
        );
      })}
    </div>
  );
};

function SetProgress(BookName: String, Progress: number) {
  modalProgress = Progress;
  targetBook = BookName;
  activateModal(true);
}

function SetBookProgress(Progress: number) {
  activateModal(false);

  if (Progress !== -1) {
    APIService.userBookProgress({
      BookName: targetBook,
      BookProgress: Progress,
    });

    _props.modifyBook(targetBook, Progress);
  }
}

function mapDispatchToProps(
  dispatch: Dispatch<
    | { type: ActionTypes; BookInfo: BookInformation }
    | { type: ActionTypes; BookName: String }
  >
) {
  return {
    modifyBook: (BookName: String, Progress: number) =>
      dispatch(ModifyBook({ BookName: BookName, BookProgress: Progress })),
    removeBook: (BookName: String) => dispatch(removeBook(BookName)),
  };
}

function mapStateToProps(state: BookInformation[]) {
  return {
    booksList: state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBooks);