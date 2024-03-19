import Link from 'next/link';

export default function ContactButton() {
  return (
    <Link href="/Contact" rel="preload" className="button">
      Contactez-nous
    </Link>
  );
}
