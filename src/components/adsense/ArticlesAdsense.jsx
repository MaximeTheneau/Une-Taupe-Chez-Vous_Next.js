import React, { useEffect, useState } from 'react';

export default function ArticlesAdsense() {
  const [adsense, setAdsense] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('cookiesModal')) {
      setAdsense(true);
    }
  }, []);
  return adsense && (
    <div id="adSense">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194552698690511"
        crossorigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9194552698690511"
        data-ad-slot="7832509827"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script dangerouslySetInnerHTML={{
        __html: `
        (adsbygoogle = window.adsbygoogle || []).push({});
      `,
      }}
      />
    </div>
  );
}
