import React from "react";
import styles from "@/styles/HeaderFooter.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        If you face any issues with this platform please feel free to email at:{" "}
        <a className={styles.link} href="mailto:srmstudenthelpline@gmail.com">
          srmstudenthelpline@gmail.com
        </a>
        .
      </p>
      <p>
        Copyright &copy; {currentYear} SRM University, Sonepat. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
