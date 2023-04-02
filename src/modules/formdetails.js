import { SUCCESS_SUFFIX } from "redux-axios-middleware";
import UserService from "../services/UserService";

const LIST_FIR = 'LIST_FIR';
const ADD_FIR = 'ADD_FIR';
const DELETE_FIR = 'DELETE_FIR';

const formsReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_FIR + SUCCESS_SUFFIX:
      console.log(action.payload.data)
      return action.payload.data;

    case DELETE_FIR:
      return state.filter((fir) => fir.id !== action.payload.fir.id);

    default:
      return state;
  }
};

export default formsReducer;

export const allFIR = () => ({
  type: LIST_FIR,
  payload: {
    request: {
      url: '/FIR',
    },
  },
});

export const addFIR = fir => {
  alert(`${UserService.getUsername()} added the complaint ${fir.district}`);
  return {
    type: ADD_FIR,
    payload: {
      request: {
        url: '/FIR',
        method: 'POST',
        data: fir,
      },
    },
  }
};

export const deleteFIR = fir => {
  console.log(`${UserService.getUsername()} deletes the complaint ${fir.district}`);
  return {
    type: DELETE_FIR,
    payload: {
      fir,
      request: {
        url: `/FIR/${fir.id}`,
        method: 'DELETE',
      },
    },
  }
};
