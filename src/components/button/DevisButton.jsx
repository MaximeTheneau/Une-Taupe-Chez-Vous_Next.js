import Link from 'next/link';

export default function DevisButton({ tabIndex }) {
  return (
    <button
      type="button"
      className="button"
      role="link"
      tabIndex={tabIndex}
    >
      <Link href="/Devis-en-ligne" rel="preload">
        Demandez un devis
      </Link>
    </button>
  );
}
