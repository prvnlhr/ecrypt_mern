import React from 'react'
import { useState, useEffect } from 'react';
import styles from "./styles/fullCardComponent.module.css"
import BackBtnIcon from "../icons/BackBtnIcon"
import { Icon } from '@iconify/react';

const FullCardComponent = ({ showContentCard, handleFullContentBackBtnClicked }) => {
    const [popUpOpen, setPopUpOpen] = useState(false);

    const [bankCardData, setBankCardData] = useState({
        title: "",
        category: "",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    })
    const [identityCardData, setIdentityCardData] = useState({
        title: "",
        category: "",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        dob: "",
    })
    const [licenseCardData, setLicenseCardData] = useState({
        title: "",
        category: "",
        cardHolder: "",
        cardNumber: "",
        expiry: "",
        dov: "",
    })

    const handleOpClick = (op) => {

        switch (op) {
            case "Identity":
                setIdentityCardData({
                    ...identityCardData,
                    category: op
                })
                break;

            case "License":
                setLicenseCardData({
                    ...licenseCardData,
                    category: op
                })
                break;

            case "Bank":
                setBankCardData({
                    ...bankCardData,
                    category: op
                })
                break;

            default:
                break;
        }

        // setCurrData({
        //     ...currData,
        //     category: op
        // })
        setPopUpOpen(!popUpOpen)
    }

    return (
        <div className={showContentCard ? styles.cardWrapper : styles.cardWrapperClose}>
            <div className={styles.cardContainer}>

                <div className={styles.cardHeader} >
                    <div className={styles.backBtnContainer} >
                        <div className={styles.backBtnDiv}
                            onClick={() => handleFullContentBackBtnClicked()}
                        >
                            <BackBtnIcon />
                        </div>
                    </div>
                    <div className={styles.editBtnContainer} ></div>
                </div>


                <div className={styles.logoTitleWrapper} >

                    <div className={styles.logoTitleContainer} >


                        <div className={styles.logoContainer} >
                            <div className={styles.logoDiv}>
                                <Icon
                                    className={styles.logoIcon}
                                    icon="logos:google-pay-icon" color="#0473ff" />
                            </div>

                        </div>


                        <div className={styles.titleContainer} >
                            <div className={styles.titleTitleDiv}>
                                <p className={styles.titleTitleText}>TITLE</p>
                            </div>
                            <div className={styles.titleTextDiv}>
                                <p className={styles.titleText}>Aadhar card</p>
                            </div>
                        </div>




                    </div>

                </div>

                <div className={styles.categoryWrapper} >
                    <div className={styles.categoryContainer} >
                        <div className={styles.catergoryTitleDiv} >
                            <p>Category</p>
                        </div>
                        <div className={styles.catergoryInputDiv} >
                            <input
                                className={styles.categoryInput}
                                value={""}
                                readOnly={true}

                            />
                            <div className={styles.popUpBtnIconDiv}>
                                <Icon
                                    className={styles.popUpIcon}
                                    icon="tabler:chevron-down" color="black" />
                            </div>

                            {
                                popUpOpen ? (
                                    <div className={styles.inputPopUpDiv}>
                                        <p className={styles.inputPopUpText}
                                            onClick={() => {
                                                handleOpClick("Identity")
                                            }}>
                                            Identity
                                        </p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("License")
                                        }}>License</p>

                                        <p className={styles.inputPopUpText} onClick={() => {
                                            handleOpClick("Bank")
                                        }}>Bank</p>

                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FullCardComponent