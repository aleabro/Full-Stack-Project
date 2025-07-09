// src/auth.js
import axios from "axios";
import {
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS
} from "./types";

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/password/reset/`, body, config);
    dispatch({ type: PASSWORD_RESET_SUCCESS });
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_FAIL });
  }
};

export const passwordResetConfirm = (uid, token, new_password, re_new_password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/password/reset/confirm/`, body, config);
    dispatch({ type: PASSWORD_RESET_CONFIRM_SUCCESS });
  } catch (error) {
    dispatch({ type: PASSWORD_RESET_CONFIRM_FAIL });
  }
};
