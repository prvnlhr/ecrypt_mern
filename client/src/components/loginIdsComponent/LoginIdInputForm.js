import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BackBtnIcon from "../icons/BackBtnIcon"
import { Icon } from '@iconify/react';
import { logosArray } from "../logoComponents/logosData"
import LogoComponentWrapper from "../logoComponents/LogoComponentWrapper"
import styles from "./styles/loginIdInputForm.module.css"
import { addNewLoginIdData } from "../../redux/features/loginsId/loginsIdSlice"
import { generateActivityData } from "../utils/ActivityDataChangeFuction"
const LoginIdInputForm = ({ formToggle, showInputForm, setShowInputForm }) => {


    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user._id);





    const [formData, setformData] = useState({
        app: "",
        category: "",
        title: "",
        username: "",
        password: "",
        logoIndex: undefined,
    });

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [logoIndx, setLogoIndx] = useState(undefined);

    const [logoComponentShow, setLogoComponentShow] = useState(false);




    const handleInputValueChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const clearForm = () => {
        setformData({
            id_: "",
            app: "",
            category: "",
            title: "",
            username: "",
            password: "",
            logoIndex: undefined,
        })
    }

    const saveBtnClicked = () => {
        const activity_data = generateActivityData(1, 'Login', formData, '')
        console.log(activity_data)
        console.table(formData);
        dispatch(addNewLoginIdData({
            data: formData,
            user_id: userId,
            activityData: activity_data
        }))
        setShowInputForm(false);
        clearForm();
    }
    useEffect(() => {
        setLogoIndx(logoIndx)
        setformData({
            ...formData,
            logoIndex: logoIndx
        })
    }, [logoIndx])

    const handleOpClick = (op) => {
        setformData({
            ...formData,
            category: op
        })
        setPopUpOpen(!popUpOpen)
    }

    const handleLogoClicked = () => {
        setLogoComponentShow(true);
    }
    return (
        <div className={showInputForm ? styles.cardWrapper : styles.cardWrapperClose}>
            {logoComponentShow &&
                <LogoComponentWrapper
                    setLogoComponentShow={setLogoComponentShow}
                    logoIndx={logoIndx}
                    setLogoIndx={setLogoIndx}
                />
            }
            <div className={styles.cardContainer}>

                <div className={styles.cardHeader}>
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => {
                                formToggle();
                                clearForm();
                            }
                            }>
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.crudBtnContainer}   >
                        <div className={styles.saveBtnDiv} onClick={saveBtnClicked}>
                            <Icon className={styles.crudIcons} icon="charm:tick-double" color="white" />
                            <p>Save</p>
                        </div>
                    </div>
                </div>

                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >
                        <div className={styles.logoContainer} onClick={handleLogoClicked} >
                            <div className={styles.logoDiv}>
                                {formData.logoIndex !== undefined &&
                                    logosArray[formData.logoIndex].logo
                                }
                            </div>
                        </div>

                        <div className={styles.titleContainer} >
                            <div className={styles.titleLabelDiv}>
                                <p className={styles.titleLabelText}>TITLE</p>
                            </div>
                            <div className={styles.titleInputDiv}>
                                <input onChange={handleInputValueChange}
                                    value={formData.title}
                                    name={"title"}
                                />
                            </div>
                        </div>


                    </div>

                </div>


                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.categoryLabelContainer} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                list="websites"
                                className={styles.categoryInput}
                                value={formData.category}
                                onChange={handleInputValueChange}
                                readOnly={true}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                <Icon
                                    onClick={() =>
                                        setPopUpOpen(!popUpOpen)
                                    }
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" color="black" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.categoryInputPopDiv}>
                                        <p className={styles.inputPopUpText}
                                            onClick={() => {
                                                handleOpClick("Finance")
                                            }}>
                                            Finance
                                        </p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Personal")
                                        }}>Personal</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Work")
                                        }}>Work</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Social")
                                        }}>Social</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Shopping")
                                        }}>Shopping</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Travel")
                                        }}>Travel</p>

                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.appWebSiteWrapper} >
                    <div className={styles.appWebSiteContainer} >
                        <div className={styles.appWebSiteIconDiv} >
                            <Icon
                                className={styles.websiteIcon}
                                icon="tabler:app-window" />
                        </div>
                        <div className={styles.appWebsiteLabelDiv} >
                            <p>App / Website</p>
                        </div>
                        <div className={styles.appWebsiteInputDiv} >
                            <input
                                value={formData.app}
                                onChange={handleInputValueChange}
                                name={"app"}
                            />
                        </div>
                    </div>

                </div>

                <div className={styles.usernameWrapper} >
                    <div className={styles.usernameContainer} >
                        <div className={styles.usernameIconDiv} >
                            <Icon
                                className={styles.usernameIcon}
                                icon="prime:user"
                            />
                        </div>
                        <div className={styles.usernameLabelDiv} >
                            <p>USERNAME / EMAIL</p>
                        </div>
                        <div className={styles.usernameInputDiv} >
                            <input className={styles.usernameInput}
                                onChange={(e) => setformData({ ...formData, username: e.target.value })}
                                // onChange={(e) => handleInputValueChange(e)}
                                value={formData.username}
                                name={"username"}

                            />
                        </div>
                    </div>
                </div>


                <div className={styles.passwordWrapper} >
                    <div className={styles.passwordContainer} >
                        <div className={styles.passwordIconDiv} >
                            <Icon
                                className={styles.passwordIcon}
                                icon="fluent:password-20-regular" /></div>
                        <div className={styles.passwordLabelDiv} >
                            <p>PASSWORD</p>
                        </div>
                        <div className={styles.passwordInputDiv} >
                            <input className={styles.usernameInput}
                                onChange={handleInputValueChange}
                                value={formData.password}
                                name={"password"}

                            />
                        </div>
                    </div></div>
            </div>
        </div >
    )
}

export default LoginIdInputForm