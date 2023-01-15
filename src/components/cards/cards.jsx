import Card from './card';
import styles from './Card.module.scss';
import SlideTransition from '../../hooks/useSlideTransition/SlideTransition';

export default function Cards({ cards, name }) {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          name={name}
        />
      ))}
    </div>

  );
}
