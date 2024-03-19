import Link from 'next/link';

export default function DevisButton() {
  return (
    <Link href="/Devis-en-ligne" rel="preload" className="button">
      Demandez un devis
    </Link>
  );
}
