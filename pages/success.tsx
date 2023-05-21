import React, { useEffect } from "react";
import styles from "@/styles/SuccessfulForm.module.css";

function SuccessfulForm() {
	useEffect(() => {
		localStorage.removeItem("phoneNumber");
	});

	return (
		<div className={styles.smain}>
			<h1 className={styles.stitle}>
				Form Submitted <span>Succesfully</span>
			</h1>
			<p className={styles.sinfo}>
				We will review and resolve the issue at priorty.
			</p>
		</div>
	);
}

export default SuccessfulForm;
