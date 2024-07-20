import styles from './LoadingAdsense.module.scss';

export default function LoadingAdsense() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.spinner}>
        <img src="https://picture.unetaupechezvous.fr/Logo-Une-Taupe-Chez-Vous.webp?width=32" alt="Logo Loading..." className={styles.logo} />
        <span>Publicité</span>
      </div>
    </div>
  );
}
