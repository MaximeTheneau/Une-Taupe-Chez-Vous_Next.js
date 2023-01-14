import PropTypes, { element } from 'prop-types';
import styles from './CloneTextWrapper.module.scss';

export default function CloneTextWrapper({ children }) {
  const handleClass = (e) => {
    e.children[0].classList.add(styles['animationText__hover--active']);
    e.children[1].classList.add(styles['animationText__cloned--active']);
    setTimeout(() => {
      e.children[0].classList.remove(styles['animationText__hover--active']);
      e.children[1].classList.remove(styles['animationText__cloned--active']);
    }, 1000);
  };

  return (
    <div
      className="relative"
      onMouseEnter={(e) => handleClass(e.currentTarget)}

    >
      <span>
        {children}
      </span>
      <span className={styles.animationText__cloned}>
        {children}
      </span>
    </div>
  );
}
