import Link from 'next/link';

export default function DevisButton({ grey }) {
  return (
    <Link href="/Devis-en-ligne" rel="preload" className={`${grey ? 'button--grey' : ''} button`}>
      Demandez un devis
    </Link>
  );
}
