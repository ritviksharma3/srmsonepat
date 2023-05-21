import React from "react";
import styles from "@/styles/SuccessfulForm.module.css";

function SuccessfulForm() {
  return (
    <div className={styles.smain}>
      <h1 className={styles.ftitle}>
        Form Submission <span>Failed</span>
      </h1>
      <p className={styles.sinfo}>Please try again later in sometime.</p>
    </div>
  );
}

export default SuccessfulForm;
