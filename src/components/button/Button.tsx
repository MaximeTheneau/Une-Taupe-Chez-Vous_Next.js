import Link from 'next/link';

interface ButtonProps {
  text: string;
  icon: string | null;
}

export default function Button({ text, icon }: ButtonProps) {
  return (
    <button
      type="button"
      className="button"
      role="link"
    >
      <Link href="/Contact">
        { text }
        {icon && (
        <i className={icon} />
        )}
      </Link>
    </button>
  );
}
