import Link from 'next/link';

export default function ContactButton() {
  return (
    <button
      type="button"
      className="button"
      role="link"
    >
      <Link href="/Contact">
        Contactez-nous
      </Link>
    </button>
  );
}
