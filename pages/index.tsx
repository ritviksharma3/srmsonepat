import Head from "next/head";
import styles from "../styles/Home.module.css";
import AuthForm from "../components/AuthForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SRM University, Sonepat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>SRM University</span>
        </h1>

        <p className={styles.description}>Transport Complaint Portal</p>
        <AuthForm />
      </main>
      <Footer></Footer>
    </div>
  );
}