import { useEffect } from 'react';
import { useCookies } from '../../context/CookiesContext';

function ArticlesAdsense() {
  const { cookies } = useCookies();
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return cookies.cookiesAdsense && (
    <div class="adSense">
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
