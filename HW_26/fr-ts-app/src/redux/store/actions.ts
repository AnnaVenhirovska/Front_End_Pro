import { ActionTypes } from "./types";

export interface BookInformation {
  BookName: String;
  BookProgress: number;
}

export const addBook = (BookInfo: BookInformation) => {
  return {
    type: ActionTypes.ADD_BOOK,
    BookInfo,
  };
};

export const removeBook = (BookName: String) => {
  return {
    type: ActionTypes.REMOVE_BOOK,
    BookName,
  };
};

export const ModifyBook = (BookInfo: BookInformation) => {
  return {
    type: ActionTypes.MODIFY_BOOK,
    BookInfo,
  };
};

export const clearBooks = () => {
  return {
    type: "CLEAR_BOOKS",
  };
};