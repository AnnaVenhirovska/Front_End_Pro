import { BookInformation } from "./actions";

export enum ActionTypes {
  ADD_BOOK = "ADD_BOOK",
  REMOVE_BOOK = "REMOVE_BOOK",
  MODIFY_BOOK = "MODIFY_BOOK",
  CLEAR_BOOKS = "CLEAR_BOOKS",
}

interface IActionA {
  type: ActionTypes.ADD_BOOK;
  BookInfo: BookInformation;
}

interface IActionB {
  type: ActionTypes.REMOVE_BOOK;
  BookName: string;
}

interface IActionC {
  type: ActionTypes.MODIFY_BOOK;
  BookInfo: BookInformation;
}

interface IActionD {
  type: ActionTypes.CLEAR_BOOKS;
}

export type IAction = IActionA | IActionB | IActionC | IActionD;