import localFont from 'next/font/local';
import Navbar from './navbar/Navbar';
import Footer from './footer/footer';

const title = localFont({
  src: [
    { path: '../asset/font/title/title.woff2' },
    { path: '../asset/font/title/title.ttf' },
  ],
  display: 'swap',
  variable: '--font-title',
});
const principal = localFont({
  src: [
    { path: '../asset/font/principal/principal.woff2' },
    { path: '../asset/font/principal/principal.ttf' },
  ],
  display: 'swap',
  variable: '--font-principal',

});
export default function Layout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={` ${principal.variable} ${title.variable}`}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
