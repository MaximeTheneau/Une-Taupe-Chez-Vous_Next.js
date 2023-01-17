import Link from "next/link";
import CloneTextWrapper from "../hooks/useHoverAnimation/CloneTextWrapper";

export default function Custom404() {
  return (
    <section>
      <h1>Désolé</h1>
      <p>Oups la page que vous recherche est innaccessible</p>
      <button type="button">
        <Link
          href="/"
        >
          <CloneTextWrapper>
            Page d&apos;accueil
          </CloneTextWrapper>
        </Link>
      </button>
    </section>
  );
}
