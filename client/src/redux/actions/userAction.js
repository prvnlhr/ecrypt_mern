import * as api from "../../api";

import moment from "moment";
import {
  loadingSetter,
  authSuccessResponseHandler,
  authErrorResponseHandler,
} from "./auth";

import {
  FETCH_USER,
  ERROR_MESSAGE,
  UPDATE_USER_PROFILE,
  ADD_ACTIVITY,
  TOGGLE_THEME
} from "./types";


export const toggleTheme = (theme) => async (dispatch) => {
  dispatch({
    type: TOGGLE_THEME,
    theme: theme,
  });
}
export const fetchUser = (token) => async (dispatch) => {
  try {
    const response = await api.fetchUser(token);
    const userData = response.data.user;
    const nameString = userData.name.split(/[" "]+/);
    const data = {
      _id: userData._id,
      firstName: nameString[0],
      lastName: nameString[1],
      email: userData.email,
    };

    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (error) {
    const failureMsg = error.response.data.msg;
    dispatch({
      type: ERROR_MESSAGE,
      message: failureMsg,
    });
  }
};

//Update Profile
export const updateProfile =
  (token, profileData, userId, oldProfileData) => async (dispatch) => {
    dispatch(loadingSetter(true, "updateProfile", "", "", ""));

    try {
      const response = await api.editProfile(token, profileData);
      const userData = response.data.newData;
      const successMsg = response.data.msg;
      const nameString = userData.name.split(/[" "]+/);
      const data = {
        _id: userData._id,
        firstName: nameString[0],
        lastName: nameString[1],
        email: userData.email,
      };
      dispatch(authSuccessResponseHandler(successMsg, "updateProfile"));
      dispatch(loadingSetter(false, "updateProfile", "", "", true));

      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: data,
      });

      const d = moment().format("LLL");
      const activity = {
        date: d,
        task: "Edited",
        type: "Settings",
        name: "Profile settings",
        item: "Profile updated",
      };
      const day = moment().format("DD");
      const month = moment().format("MMM");
      const time = moment().format("h:mma");
      const dynamicActivity = {
        date: day,
        month: month,
        time: time,
        type: "settings",
        action: "profileUpdate",
        oldEmail: oldProfileData.email,
        newEmail: userData.email,
        oldFirstName: oldProfileData.firstName,
        newFirstName: nameString[0],
        oldLastName: oldProfileData.lastName,
        newLastName: nameString[1],
      };
      const activityResponse = await api.addActivity(
        activity,
        userId,
        dynamicActivity
      );
      dispatch({
        type: ADD_ACTIVITY,
        payload: dynamicActivity,
      });
    } catch (error) {
      dispatch(loadingSetter(false, "updateProfile", "", "", false));
      console.log("error at edit profile action", error.response.data.msg);
      const failureMsg = error.response.data.msg;
      dispatch(authErrorResponseHandler(failureMsg, "updateProfile"));
      // dispatch({
      //   type: ERROR_MESSAGE,
      //   message: failureMsg,
      // });
      // dispatch({
      //   type: LOADING_END,
      // });
    }
  };
