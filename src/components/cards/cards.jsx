import Card from './card';
import styles from './Card.module.scss';

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
