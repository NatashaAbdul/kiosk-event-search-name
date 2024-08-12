import {
  ORDER_CLEAR,
  NUMBER_SET_TYPE,
  ATTENDEE_SET_TYPE,
  LETTER_SET_TYPE,
  COMPANY_SET_TYPE,
} from "./constants";

export const setNumber = (dispatch, number) => {
  return dispatch({
    type: NUMBER_SET_TYPE,
    payload: number,
  });
};

export const setAttendee = (dispatch, attendee) => {
  return dispatch({
    type: ATTENDEE_SET_TYPE,
    payload: attendee,
  });
};

export const setLetter = (dispatch, letter) => {
  return dispatch({
    type: LETTER_SET_TYPE,
    payload: letter,
  });
};

export const setCompany = (dispatch, company) => {
  return dispatch({
    type: COMPANY_SET_TYPE,
    payload: company,
  });
};

export const clearOrder = async (dispatch) => {
  return dispatch({
    type: ORDER_CLEAR,
  });
};
