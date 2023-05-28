import styles from "@/styles/HeaderFooter.module.css";
import Logo from "/public/logo.png";
import Image from "next/image";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Image
          src={Logo}
          width={200}
          height={80}
          alt="SRM University, Sonepat"
        />
      </div>
      <h1 className={styles.title}>SRM University, Sonepat</h1>
    </header>
  );
}

export default Header;
