import Link from 'next/link';
import Search from '../search/Search';

export default function Footer() {
  return (
    <div className="bg-primary py-8 px-4">
      <div className="flex flex-wrap justify-around items-center  w-full">
        <nav className="md:!w-1/2 w-full" aria-label="Navigation pied de page">
          <ul className="grid gap-6 ">
            <li>
              <Link href="/" className="!text-black">
                Accueil - Une Taupe Chez Vous
              </Link>
            </li>
            <li>
              <Link href="/Devis-en-ligne" className=" !text-black">
                Devis en ligne
              </Link>
            </li>
            <li>
              <Link href="/Contact" className=" !text-black">
                Contactez-nous
              </Link>
            </li>
            <li>
              <Link href="/Temoignages" className=" !text-black">
                Témoignages
              </Link>
            </li>
            <li>
              <Link href="/Taupier-agree-professionnel-depuis-1994" className=" !text-black">
                Taupier agréé professionnel depuis 1994
              </Link>
            </li>
            <li />
          </ul>
        </nav>
        <div className="md:!w-1/2 w-full">
          <Search id="footer-search" />
        </div>

      </div>
      <hr className="border-black" />
      <ul className="flex flex-wrap justify-center gap-8 my-4 text-black" aria-label="Réseaux sociaux">
        <li>
          <Link href="https://www.linkedin.com/company/une-taupe-chez-vous" aria-label="Suivez-nous sur LinkedIn" title="Linkedin" rel="noopener" target="_blank" prefetch={false}>
            <i className="icon-linkedin text-black" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link href="https://x.com/UneTaupe_" aria-label="Suivez-nous sur X (anciennement Twitter)" title="X (anciennement Twitter)" target="_blank" rel="noopener" prefetch={false}>
            <i className="icon-twitter text-black" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/unetaupechezvous/" aria-label="Suivez-nous sur Facebook" title="Facebook" target="_blank" rel="noopener" prefetch={false}>
            <i className="icon-facebook text-black" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link href="https://www.tiktok.com/@une_taupe_chez_vous?lang=fr" aria-label="Suivez-nous sur TikTok" title="TikTok" target="_blank" rel="noopener" prefetch={false}>
            <svg fill="#000000" width="16px" height="16px" viewBox="0 0 512 512" id="icons" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier"><path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" /></g>
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.youtube.com/@unetaupechezvous" aria-label="Suivez-nous sur YouTube" title="YouTube" target="_blank" rel="noopener" prefetch={false}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z" />
            </svg>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/unetaupechezvous/" aria-label="Suivez-nous sur Instagram" title="Instagram" target="_blank" rel="noopener" prefetch={false}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 30 30" aria-hidden="true">
              <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
            </svg>
          </Link>
        </li>
      </ul>

      <hr className="border-black mb-4" />
      <div className="flex justify-center md:!flex-row flex-col gap-4 ">
        <p>
          <Link href="/Plan-de-site" className="!text-black">
            Plan du site
          </Link>
        </p>
        <p>
          <Link href="/Foire-aux-questions" className="!text-black">
            Question fréquentes (FAQ)
          </Link>
        </p>
        <p>
          <Link href="/Mentions-Legales" className="!text-black">
            Mentions légales
          </Link>
        </p>
      </div>
    </div>
  );
}
