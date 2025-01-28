import Link from 'next/link';
import Image from '@/utils/Image';

type CardProps = {
  card: {
    imgPost: string;
    slug: string;
    altImg?: string;
    title: string;
    url: string;
  };
};

export default function Card({ card }: CardProps) {
  return (
    <Link
      href={card.url}
      className="w-full h-full relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 "
    >
      <div className="relative w-full h-[330px] overflow-hidden  rounded-2xl border border-1 border-solid  border-black">
        <Image
          className="w-full !h-full z-0 object-cover transition-transform duration-300 hover:scale-110 "
          src={`${card.imgPost}?width=330&height=330`}
          alt={card.altImg || card.title}
          width={330}
          height={330}
          priority={false}
          srcset={undefined}
        />
        <div className="absolute z-10 bottom-0 left-0 w-full h-2/3 md:h-2/3 bg-gray-900/50 text-white  p-2">
          <h3>
            {card.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
