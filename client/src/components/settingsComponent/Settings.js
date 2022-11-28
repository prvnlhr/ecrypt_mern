import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles/settings.module.css";
import { changePassword, deleteAccount } from "../../redux/actions/auth";
import { updateProfile } from "../../redux/actions/userAction";
import { CircleSpinner } from "react-spinners-kit";
import {
  authResponseClear,
  authErrorResponseHandler,
} from "../../redux/actions/auth";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Settings = ({ setHeading }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const loadState = useSelector((state) => state.loading);
  const [oldProfileData, setOldProfileData] = useState();
  const { place, isLoading } = loadState;
  const responseHandler = useSelector((state) => state.authResponseHandler);
  const { at, error, success } = responseHandler;

  const [inputState, setInputState] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [editState, setEditState] = useState({
    isEditing: false,
    inputState: false,
    value: 0,
  });

  const { firstName, lastName, email } = profileData;
  const { oldPassword, newPassword } = passwordData;

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const handlePassInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    //NOTE: we are passing userId to add activity
    if (oldPassword && newPassword.length >= 6) {
      dispatch(changePassword(oldPassword, newPassword, token, user._id));
    } else if (newPassword.length < 6) {
      dispatch(
        authErrorResponseHandler(
          "New password must be at least 6 character ",
          "changePassword"
        )
      );
      return;
    }
  };

  const handleAccountDelete = () => {
    dispatch(deleteAccount(oldPassword, token));
  };
  const handleEditProfile = () => {
    //NOTE: we are passing userId to add activity
    dispatch(updateProfile(token, profileData, user._id, oldProfileData));
  };

  const notificationClear = () => {
    dispatch(authResponseClear());
  };
  const switchEditMode = (isEdit, input, val) => {
    if (success) {
      dispatch(authResponseClear());
    }
    if (val === 0) {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
    }
    //   console.log("profileData", profileData);
    //   dispatch(clearNotification("error"));
    //   dispatch(clearNotification("success"));
    // }

    // if (notification.error || notification.success) {
    //   setPasswordData({
    //     oldPassword: "",
    //     newPassword: "",
    //   });
    //   dispatch(clearNotification("error"));
    //   dispatch(clearNotification("success"));
    // }

    setEditState({
      isEditing: isEdit,
      inputState: input,
      value: val,
    });
  };
  useEffect(() => {
    setHeading("Settings");
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setOldProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    // console.log(profileData);
  }, [user]);

  useEffect(() => {
    if (success && editState.isEditing === true && editState.value !== 2) {
      setEditState({
        isEditing: false,
        inputState: false,
        value: 0,
      });
    } else if (
      success &&
      editState.isEditing === true &&
      editState.value === 2
    ) {
      setEditState({
        isEditing: false,
        inputState: false,
        value: 0,
      });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
    }
    // dispatch(authResponseClear());
  }, [success]);


  return (
    <div className={styles.settingsComponent}>
      <div className={styles.profileContainer}>
        <div className={styles.notificationDiv}>
          {at === "updateProfile" && error ? (
            <div className={styles.notificationErrorDiv}>
              <Icon icon="carbon:warning" className={styles.icon} />

              <p>{error}</p>
            </div>
          ) : (
            at === "updateProfile" &&
            success && (
              <div className={styles.notificationSuccessDiv}>
                <Icon icon="akar-icons:circle-check" className={styles.icon} />

                <p>{success}</p>
              </div>
            )
          )}
        </div>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Profile</p>
        </div>
        <div className={styles.bodyDiv}>
          <div className={styles.formContainer}>
            <p className={styles.firstNameLabel}>First Name</p>
            <p className={styles.lastNameLabel}>Last Name</p>

            <input
              className={` ${styles.firstNameInput} ${styles.inputField} ${editState.inputState === true && editState.value === 1
                ? styles.activeInput
                : styles.inactiveInput
                }`}
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleProfileInputChange}
              disabled={editState.inputState === false && editState.value === 0}
            ></input>
            <input
              className={`${styles.lastNameInput} 
              ${styles.inputField}
               ${editState.inputState === true && editState.value === 1
                  ? styles.activeInput
                  : styles.inactiveInput
                }
              `}
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleProfileInputChange}
              disabled={editState.inputState === false && editState.value === 0}
            ></input>

            <p className={styles.emailLabel}>Email Address</p>
            <input
              className={`${styles.emailInput}
              ${styles.inputField}
              ${editState.inputState === true && editState.value === 1
                  ? styles.activeInput
                  : styles.inactiveInput
                }
              
              `}
              name="email"
              id="email"
              value={email}
              onChange={handleProfileInputChange}
              disabled={editState.inputState === false && editState.value === 0}
            ></input>
          </div>
        </div>
        <div className={styles.profileButtonContainer}>
          {editState.inputState && editState.value === 1 ? (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={styles.confirmBtn}
                onClick={handleEditProfile}
              >
                {place === "updateProfile" && isLoading === true ? (
                  <CircleSpinner size={12} color="white" loading={true} />
                ) : (
                  "save changes"
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={styles.cancelBtn}
                onClick={() => {
                  switchEditMode(false, false, 0);
                  setInputState(!inputState);
                  notificationClear();
                }}
              >
                cancel
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={styles.editProfileBtn}
                onClick={() => {
                  switchEditMode(true, true, 1);
                }}
              >
                Edit Profile
              </motion.button>
            </>
          )}
        </div>
      </div>

      <div className={styles.changePasswordContainer}>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Password</p>
        </div>
        <div className={styles.notificationDiv}>
          {at === "changePassword" && error ? (
            <div className={styles.notificationErrorDiv}>
              <Icon icon="carbon:warning" className={styles.icon} />

              <p>{error}</p>
            </div>
          ) : (
            at === "changePassword" &&
            success && (
              <div className={styles.notificationSuccessDiv}>
                <Icon icon="akar-icons:circle-check" className={styles.icon} />

                <p>{success}</p>
              </div>
            )
          )}
        </div>
        <div className={styles.bodyDiv}>
          {editState.inputState &&
            editState.value === 2 &&
            editState.isEditing === true ? (
            <>
              <div className={styles.changePasswordDiv}>
                <input
                  className={styles.inputField}
                  name="oldPassword"
                  placeholder="Enter your old password"
                  id="oldPassword"
                  value={oldPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
                <input
                  className={styles.inputField}
                  name="newPassword"
                  placeholder="Enter your new password"
                  id="newPassword"
                  value={newPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
              </div>
              <div className={styles.passwordChangeButtonDiv}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={styles.confirmBtn}
                  onClick={handlePasswordChange}
                >
                  {place === "changePassword" && isLoading === true ? (
                    <CircleSpinner size={12} color="white" loading={true} />
                  ) : (
                    "confirm"
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={styles.cancelBtn}
                  onClick={() => {
                    switchEditMode(false, false, 0);
                    notificationClear();
                  }}
                >
                  cancel
                </motion.button>
              </div>
            </>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={styles.changePassBtn}
              onClick={() => {
                switchEditMode(true, true, 2);
              }}
            >
              Change password
            </motion.button>
          )}
        </div>
      </div>

      <div className={styles.deleteAccountContainer}>
        <div className={styles.headerDiv}>
          <p className={styles.headingText}>Delete Account</p>
        </div>
        <div className={styles.notificationDiv}>
          {at === "deleteAccount" && error ? (
            <div className={styles.notificationErrorDiv}>
              <Icon icon="carbon:warning" className={styles.icon} />

              <p>{error}</p>
            </div>
          ) : (
            at === "deleteAccount" &&
            success && (
              <div className={styles.notificationSuccessDiv}>
                <Icon icon="akar-icons:circle-check" className={styles.icon} />

                <p>{success}</p>
              </div>
            )
          )}
        </div>
        <div className={styles.bodyDiv}>
          {editState.inputState &&
            editState.value === 3 &&
            editState.isEditing === true ? (
            <>
              <div className={styles.deleteInputDiv}>
                <p className={styles.disclaimer}>Confirm your password</p>

                <input
                  className={styles.inputField}
                  name="oldPassword"
                  placeholder="Enter your old password"
                  id="oldPassword"
                  value={oldPassword}
                  autocomplete="off"
                  onChange={handlePassInputChange}
                ></input>
              </div>

              <div className={styles.deleteBtnDiv}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={styles.confirmBtn}
                  onClick={handleAccountDelete}
                >
                  {place === "deleteAccount" && isLoading === true ? (
                    <CircleSpinner size={12} color="white" loading={true} />
                  ) : (
                    "confirm"
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={styles.cancelBtn}
                  onClick={() => {
                    switchEditMode(false, false, 0);
                    notificationClear();
                  }}
                >
                  cancel
                </motion.button>
                <br />
              </div>
            </>
          ) : (
            <>
              <div className={styles.disclaimerDiv}>
                <div className={styles.disclaimerText1Div}>
                  <Icon
                    icon="carbon:warning"
                    className={styles.deleteAccIcon}
                  />
                  <p className={styles.disclaimerText1}>
                    Delete account permanently
                  </p>
                </div>

                <p className={styles.disclaimerText}>
                  Deleting your account will delete your profile and all the
                  associated data
                </p>
                <p className={styles.disclaimerText}>
                  You will be logged out after deleting your account
                </p>
              </div>

              <br />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={styles.deleteAccountBtn}
                onClick={() => switchEditMode(true, true, 3)}
              >
                Delete Account
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
