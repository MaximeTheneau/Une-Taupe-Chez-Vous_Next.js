import Card from './card';
import styles from './Card.module.scss';

export default function Cards({ cards }) {
  return (
    <ul className={styles.cards}>
      {cards.map((card) => (
        <Card
          key={card.title}
          card={card}
        />
      ))}
    </ul>
  );
}
