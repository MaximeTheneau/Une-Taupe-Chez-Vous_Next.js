import Link from 'next/link';

export default function DevisButton({ grey }) {
  return (
    <Link href="/Devis-en-ligne" role="link" className={`${grey ? 'button--grey' : ''} button`}>
      Demandez votre devis pour vos nuisibles
    </Link>
  );
}
