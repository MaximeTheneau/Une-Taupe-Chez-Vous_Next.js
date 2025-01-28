import { CardType } from '@/types/card.type';
import Card from './Card';

type CardsProps = {
  cards: CardType[];
};

export default function Cards({ cards }: CardsProps) {
  return (
    <ul className="flex flex-wrap justify-center ">
      {cards.map((card) => (
        <li
          key={card.title}
          className="w-[150px] md:w-[330px]  transform transition-all !list-none !m-2 "
        >
          <Card card={card} />
        </li>
      ))}
    </ul>
  );
}
