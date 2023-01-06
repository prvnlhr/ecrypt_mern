import React, { useState, useEffect } from 'react'
import styles from "../styles/IdentityCardSubComponent.module.css"
import { Icon } from '@iconify/react';
const IdentityCardSubComponent = ({ fullContentCardData, setFullContentCardData, editMode, setEditMode }) => {

  const handleInputValueChange = (e) => {
    setFullContentCardData({
      ...fullContentCardData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className={styles.cardWrapper} >
      <div className={styles.cardHolderWrapper}>
        <div className={styles.cardHolderContainer}>
          <div className={styles.cardHolderIconDiv}>
            <Icon
              className={styles.cardHolderIcon}
              icon="prime:user" color="#002a9a"
            />
          </div>
          <div className={styles.cardHolderLabelTextDiv}>
            <p>CARD HOLDER</p>
          </div>
          <div className={styles.cardHolderInputDiv}>
            <input
              className={editMode ? styles.cardHolderInputActive : styles.cardHolderInputNotActive}
              value={fullContentCardData.cardHolder}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"cardHolder"}
            />
          </div>
        </div>
      </div>
      <div className={styles.cardNumberWrapper}>
        <div className={styles.cardNumerContainer}>
          <div className={styles.cardNumberIconDiv}>
            <Icon className={styles.cardNumIcon} icon="vaadin:password" color="#002a9a" />
          </div>
          <div className={styles.cardNumberLabelTextDiv}>
            <p>CARD NUMBER</p>
          </div>
          <div className={styles.cardNumberInputDiv}>
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.cardNumber}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"cardNumber"}
            />
          </div>
        </div>
      </div>
      <div className={styles.dobDateWrapper}>
        <div className={styles.dobDateContainer}>
          <div className={styles.dobIconDiv} >
            <Icon className={styles.doBIcon} icon="uil:calender" color="#002a9a" />

          </div>
          <div className={styles.dobLabelTextDiv} >
            <p>DOB</p>
          </div>
          <div className={styles.dobDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.dob}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"dob"}
            />
          </div>
        </div>
      </div>
      <div className={styles.issueDateWrapper}>
        <div className={styles.issueDateContainer}>
          <div className={styles.issueIconDiv} >
            <Icon className={styles.issueDateIcon} icon="fluent:notepad-16-regular" color="#002a9a" />
          </div>
          <div className={styles.issueLabelTextDiv} >
            <p>ISSUE DATE</p>
          </div>
          <div className={styles.issueDateInputDiv} >
            <input
              className={editMode ? styles.inputActive : styles.inputNotActive}
              value={fullContentCardData.issueDate}
              readOnly={editMode ? false : true}
              onChange={handleInputValueChange}
              name={"issueDate"}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default IdentityCardSubComponent