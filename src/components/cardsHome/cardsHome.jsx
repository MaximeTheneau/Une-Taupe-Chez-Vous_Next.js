import Card from './cardHome';
import styles from './CardHome.module.scss';

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
