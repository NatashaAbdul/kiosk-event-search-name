import React, { createContext, useReducer } from "react";
import {
  ORDER_CLEAR,
  NUMBER_SET_TYPE,
  ATTENDEE_SET_TYPE,
  LETTER_SET_TYPE,
  COMPANY_SET_TYPE,
} from "./constants";

export const Store = createContext();

const initialState = {
  number: {},
  attendee: {},
  letter: {},
  company: {},
};

function reducer(state, action) {
  switch (action.type) {
    case NUMBER_SET_TYPE:
      return {
        ...state,
        number: { ...state.number, number: action.payload },
      };
    case ATTENDEE_SET_TYPE:
      return {
        ...state,
        attendee: { ...state.attendee, attendee: action.payload },
      };
    case LETTER_SET_TYPE:
      return {
        ...state,
        letter: { ...state.letter, letter: action.payload },
      };
    case COMPANY_SET_TYPE:
      return {
        ...state,
        company: { ...state.company, company: action.payload },
      };
    case ORDER_CLEAR:
      return {
        number: {},
        attendee: {},
        letter: {},
        company: {},
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
