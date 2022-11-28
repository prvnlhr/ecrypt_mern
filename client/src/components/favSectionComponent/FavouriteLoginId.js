import React from "react";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { loginIdFavToggle } from "../../redux/actions/loginInIdsAction";
import LoginIdLogo from "../loginIdsComponent/LoginIdLogo";
import styles from "../loginIdsComponent/styles/loginIdComponent.module.css";
import { motion } from "framer-motion";
import { Icon, InlineIcon } from "@iconify/react";
import BookmarkPlus from "../icons/BookmarkPlus";
import BookmarkFill from "../icons/BookmarkFill";

const FavouriteLoginId = ({ favItem }) => {
  const dispatch = useDispatch();
  const [currLoginIdData, setCurrLoginIdData] = useState();

  useEffect(() => {
    setCurrLoginIdData(favItem);
  }, [favItem]);
  const handleFavToggle = (loginCardId) => {
    var favValue = currLoginIdData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrLoginIdData({ ...currLoginIdData, isFavourite: isFav });
    dispatch(loginIdFavToggle(loginCardId, isFav));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={styles.loginIdContainer}
    >
      <div className={styles.buttonWrapper}>
        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(favItem._id, favItem.isFavourite);
          }}
        >
          {(
            currLoginIdData ? currLoginIdData.isFavourite : favItem.isFavourite
          ) ? (
            <BookmarkFill
              className={styles.favIcon}
              primaryColor={"#2882FF"}
              secondaryColor={"white"}
            />
          ) : (
            <BookmarkPlus
              className={styles.favIcon}
              primaryColor={"#9baece"}
              secondaryColor={"#2882FF"}
            />
          )}
        </button>
      </div>
      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <LoginIdLogo website={favItem.website} />
        </div>
      </div>
      <div className={styles.websiteWrapper}>
        <div className={styles.websiteDiv}>
          <p className={styles.websiteText} color="gray">
            {favItem.website}
          </p>
        </div>
      </div>

      <div className={styles.userNameWrapper}>
        <div className={styles.iconDiv}>
          <Icon icon="fa-solid:user" className={styles.textIcon} />
        </div>
        <div className={styles.textDiv}>
          <p>{favItem.username}</p>
        </div>
      </div>
      <div className={styles.passwordWrapper}>
        <div className={styles.iconDiv}>
          <Icon icon="fa-solid:lock" className={styles.textIcon} />
        </div>
        <div className={styles.textDiv}>
          <p>{favItem.password}</p>
        </div>
      </div>
    </motion.div>
  );
};
export default FavouriteLoginId;
