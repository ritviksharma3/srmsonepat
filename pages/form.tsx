import DetailForm from "@/components/DetailForm";
import styles from "@/styles/Home.module.css";

function Form() {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1 className={styles.title}>
					Fill the <span>Form.</span>
				</h1>
				<p className={styles.description}>
					Our team will review and resolve your query at the earliest.
				</p>
				<DetailForm />
			</main>
		</div>
	);
}

export default Form;
