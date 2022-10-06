import { BookInformation } from "./actions";
import { ActionTypes, IAction } from "./types";


const initialState: BookInformation[] = [];

const reducers = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOK:
        if (state.findIndex(t => t.BookName === action.BookInfo.BookName) === -1) {
            return [
                ...state,
                {
                ...action.BookInfo
                }
            ];
        }
        else  {
            return state;
        }
    case ActionTypes.REMOVE_BOOK:
      return state.filter(userbook => userbook.BookName !== action.BookName);
    case ActionTypes.MODIFY_BOOK:
        const bookIndex = state.findIndex(t => t.BookName === action.BookInfo.BookName);
        if (bookIndex !== -1) {
            state[bookIndex].BookProgress = action.BookInfo.BookProgress;
            return [
                ...state
            ];
        }
        else  {
            return state;
        }
    case ActionTypes.CLEAR_BOOKS:
        return [];
    default:
      return state;
  }
};

export default reducers;