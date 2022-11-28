import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./styles/dashboard.module.css";
import ActivityList from "./activitySection/ActivityList";
const Dashboard = ({ setHeading }) => {
  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsArray = useSelector((state) => state.cards.cards);
  const docsArray = useSelector((state) => state.docs.docs);
  const activitiesArray = useSelector((state) => state.activities);

  // useEffect(() => {
  //   setHeading("Dashboard");
  // }, []);

  return (
    <div className={styles.dashboardComponent}>
      DASHBOARD
      {/* <div className={styles.countWrapper}>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{cardsArray.length}</p>
          </div>
          <div className={`  ${styles.footer} ${styles.footerOne} `}>
            <div className={styles.underLineDiv1}></div>
            <p>Cards</p>
          </div>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{loginIdsArray.length}</p>
          </div>
          <div className={`  ${styles.footer} ${styles.footerOne} `}>
            <div className={styles.underLineDiv2}></div>
            <p>Logins</p>
          </div>
        </div>
        <div className={styles.countContainer}>
          <div className={styles.countDiv}>
            <p>{docsArray.length}</p>
          </div>
          <div className={`  ${styles.footer} ${styles.footerOne} `}>
            <div className={styles.underLineDiv3}></div>
            <p>Docs</p>
          </div>
        </div>
      </div>
      <div className={styles.recentActivityListHeadingDiv}>
        <p>Recent Activities</p>
      </div>
      <ActivityList activities={activitiesArray} /> */}
    </div>
  );
};
export default Dashboard;
