import { useEffect, useState } from 'react';
import { useCookies } from '../../context/CookiesContext';
import LoadingAdsense from '../loading/LoadingAdsense';
import styles from './ArticlesAdsense.module.scss';

function ArticlesAdsense() {
  const [isLoaded, setIsLoaded] = useState(false);

  const { cookies } = useCookies();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return cookies.cookiesAdsense && (
    <div className={styles.adSense}>
      {isLoaded && <LoadingAdsense />}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9194552698690511"
        data-ad-slot="7832509827"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default ArticlesAdsense;
