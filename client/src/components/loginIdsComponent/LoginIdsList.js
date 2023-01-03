import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from 'react-redux';
import LoginId from "./LoginId";
import styles from "./styles/loginList.module.css";
import noContentStyles from "../docsComponent/styles/noContentMessage.module.css";
import btnStyles from "../add_button/buttons.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { CircleSpinner } from "react-spinners-kit";
import FullContentCard from "./FullContentCard";
import AddBtn from "../buttons/AddBtn";
import LoginIdInputForm from "./LoginIdInputForm";

const LoginIdsList = ({ setLogoComponentShow }
) => {

  const loginIdsArray = useSelector((state => state.loginIds.loginsIdData));

  // console.table(loginIdsArray);
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);
  const [currEditId, setCurrEditId] = useState(null);


  const [editMode, setEditMode] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);

  const [showContentCard, setShowContentCard] = useState(false);

  const [fullContentCardData, setFullContentCardData] = useState(
    // {
    //   app: "",
    //   category: "",
    //   title: "",
    //   username: "",
    //   password: "",
    // }
    undefined
  )
  // useEffect(() => {
  //   setHeading("LoginIds");
  // }, []);

  // SCROLLING BUTTON HIDE__
  // const node = useRef();
  // var timeOut = null;
  // const [isScrolling, setIsScrolling] = useState(false);
  // useEffect(() => {
  //   if (node.current != null) {
  //     node.current.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     if (node.current != null) {
  //       node.current.removeEventListener("scroll", handleScroll);
  //     }
  //   };
  // }, []);

  // const handleScroll = (e) => {
  //   setIsScrolling(true);
  //   clearTimeout(timeOut);
  //   timeOut = setTimeout(() => {
  //     setIsScrolling(false);
  //   }, 200);
  // };

  const formToggle = () => {

    if (showInputForm) {

    }
    setShowInputForm(!showInputForm);
  };


  const loginIds = [

    {
      app: "Gpay",
      category: "Finance",
      title: "Google pay",
      username: "andrew.GarF@gmial.com",
      password: "andrew@122",
      logoIndex: 39,
    },
    {
      app: "Amazon",
      category: "Shopping",
      title: "Amazon shopping app",
      username: "andrew@amz.com",
      password: "andrew@1dsds",
      logoIndex: 5,

    }
    , {
      app: "Instagram",
      category: "Social",
      title: "Instagram app",
      username: "andrew@facebook.com",
      password: "andrew@1d32",
      logoIndex: 50,

    }, {
      app: "facebbok",
      category: "Social",
      title: "Facebook.com",
      username: "andrew@facebook.com",
      password: "andrew@1d32",
      logoIndex: 28,

    }, {
      app: "Gmail",
      category: "Social",
      title: "Gmail primary",
      username: "andrew@facebook.com",
      password: "andrew@1d32",
      logoIndex: 35,

    }, {
      app: "Github",
      category: "Social",
      title: "Github.com",
      username: "andrew@facebook.com",
      password: "andrew@1d32",
      logoIndex: 34,

    }, {
      app: "Spotify",
      category: "Social",
      title: "Spotify music app",
      username: "andrew@facebook.com",
      password: "andrew@1d32",
      logoIndex: 79,
    }

  ]



  const handleFullContentBackBtnClicked = () => {
    setShowContentCard(false);
    setEditMode(false);
  }

  const handleLoginIdClicked = (loginIData) => {
    // console.log(loginIData)
    if (loginIData != undefined) {
      setFullContentCardData({
        _id: loginIData._id,
        app: loginIData.app,
        category: loginIData.category,
        title: loginIData.title,
        username: loginIData.username,
        password: loginIData.password,
        logoIndex: loginIData.logoIndex,
      })
    }
    setShowContentCard(true);
  }

  return (
    <div className={styles.loginsList}>
      {
        (!showInputForm && !showContentCard) &&
        < AddBtn formToggle={formToggle} />
      }
      <div className={(showContentCard || showInputForm) ? styles.contentContainerClose : styles.contentContainer}>
        {loginIdsArray.map((loginId, index) => (
          <LoginId
            key={loginId._id}
            loginId={loginId}
            handleLoginIdClicked={handleLoginIdClicked}
          />
        ))}
      </div>

      {fullContentCardData &&
        <FullContentCard
          setLogoComponentShow={setLogoComponentShow}
          fullContentCardData={fullContentCardData}
          setFullContentCardData={setFullContentCardData}
          showContentCard={showContentCard}
          setShowContentCard={setShowContentCard}
          handleFullContentBackBtnClicked={handleFullContentBackBtnClicked}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      }
      <LoginIdInputForm
        showInputForm={showInputForm}
        setShowInputForm={setShowInputForm}
        formToggle={formToggle}

      />
      {/* {showInputForm &&
      } */}
    </div >
  );
};

export default LoginIdsList;
{/* <div className={styles.contentContainer} ref={node}>

        {loginsFetching === true && loginIds.length < 1 ? (
          <>
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
          </>
        ) : loginsFetching === false && loginIds.length < 1 ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : (
          loginsFetching === false &&
          loginIds.length > 1 &&
          (
            <>
              {loginIds.map((loginId, index) => (
                <React.Fragment key={loginId._id}>
                  <LoginId
                    index={index}
                    loginId={loginId}
                    setCurrentId={setCurrentId}
                    formMode={formMode}
                    setFormMode={setFormMode}
                    setEditButton={setEditButton}
                    showEditButton={showEditButton}
                    setCurrEditId={setCurrEditId}
                    currEditId={currEditId}
                  />
                </React.Fragment>
              ))}
            </>
          )
        )}
        <Suspense
          fallback={
            <div>
              <CircleSpinner size={12} color="gray" loading={true} />
            </div>
          }
        >
          <LoginIdForm
            currentId={currentId}
            setCurrentId={setCurrentId}
            formMode={formMode}
            setFormMode={setFormMode}
          />
        </Suspense>

        {formMode === false ? (
          <div
            className={
              isScrolling === false
                ? btnStyles.addBtnWrapper
                : btnStyles.addBtnWrapperHidden
            }
            onClick={formToggle}
          >
            <div className={btnStyles.addBtnIconDIv}>
              <HiPlus />
            </div>
            <div className={btnStyles.addBtnTextDiv}>
              <p>Add</p>
            </div>
          </div>
        ) : null}
      </div> */}