export default function ArticlesAdsense() {
  return window.localStorage.getItem('cookiesAdsense')
    && (
    <div style={{ display: 'block', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlignt: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9194552698690511"
        data-ad-slot="7773865737"
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
