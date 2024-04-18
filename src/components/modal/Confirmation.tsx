import { useEffect } from 'react';
import styleModal from './Modal.module.scss';

export default function Confirmation({
  title, message, toggleModal, onClick,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.className = toggleModal ? 'overflow-hidden' : '';
  }, [toggleModal]);
  return toggleModal ? (
    <>
      <div className={styleModal.modal__blur} />
      <div className={styleModal.modal}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button
          type="button"
          className="button-submit"
          onClick={onClick}
        >
          Fermer
        </button>
      </div>
    </>
  ) : null;
}
