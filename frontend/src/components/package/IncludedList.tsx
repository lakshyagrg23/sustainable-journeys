import React from 'react';
import { FaCar, FaCamera, FaHotel, FaUsers, FaPlane, FaUtensils, FaBicycle } from 'react-icons/fa';
import { GiCruiser } from 'react-icons/gi';
import { LuTicketsPlane } from 'react-icons/lu';
import { Binoculars } from 'lucide-react';


export type IncludedItem = {
  id?: string | number;
  item?: string;
  description?: string;
  emoji?: string | null;
  iconName?: string | null;
  icon?: string | null;
  icons?: string | null;
};

const getIncludedIcon = (item: IncludedItem, normalizedTitle: string) => {
  const emoji = typeof item?.emoji === 'string' && item.emoji.trim() ? item.emoji.trim() : null;
  if (emoji) return <span role="img" aria-label={String(item?.item || '')} className="leading-none">{emoji}</span>;

  const rawName = (item?.iconName || item?.icon || item?.icons || '').toString().toLowerCase().trim();

  // Only accept the canonical keys from the backend per spec
  switch (rawName) {
    case 'transportation':
      return <FaCar className="text-purple-600" />;
    case 'photoshoot':
      return <FaCamera className="text-purple-600" />;
    case 'tickets':
      return <LuTicketsPlane className="text-purple-600" />;
    case 'accommodation':
      return <FaHotel className="text-purple-600" />;
    case 'cruise':
      return <GiCruiser className="text-purple-600" />;
    case 'sightseeing':
      return <Binoculars className="text-purple-600" />;
    case 'bike':
      return <FaBicycle className="text-purple-600" />;
    case 'breakfast':
      return <FaUtensils className="text-purple-600" />;
    default:
      break;
  }

  // If backend didn't provide a canonical iconName but gave a descriptive title, fall back to heuristics.
  if (normalizedTitle.includes('hotel') || normalizedTitle.includes('accommodation')) return <FaHotel className="text-purple-600" />;
  if (normalizedTitle.includes('transport') || normalizedTitle.includes('transfer') || normalizedTitle.includes('cab') || normalizedTitle.includes('taxi')) return <FaCar className="text-purple-600" />;
  if (normalizedTitle.includes('meal') || normalizedTitle.includes('food')) return <FaUtensils className="text-purple-600" />;
  if (normalizedTitle.includes('guide') || normalizedTitle.includes('tour') || normalizedTitle.includes('sight')) return <FaUsers className="text-purple-600" />;
  if (normalizedTitle.includes('beach') || normalizedTitle.includes('water')) return <FaCamera className="text-purple-600" />;
  if (normalizedTitle.includes('flight') || normalizedTitle.includes('air')) return <FaPlane className="text-purple-600" />;

  // Final fallback
  return <FaCamera className="text-purple-600" />;
};

type Props = {
  items: IncludedItem[];
};

export default function IncludedList({ items }: Props) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => {
          const key = item?.id ?? idx;
          const titleText = item?.item ?? 'Included item';
          const descText = item?.description ?? '';
          const normalized = typeof titleText === 'string' ? titleText.toLowerCase() : '';

          return (
            <div key={key} className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-3 flex items-center justify-center text-lg md:text-2xl lg:text-3xl" aria-hidden={item?.emoji ? 'false' : 'true'}>
                {getIncludedIcon(item, normalized)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 capitalize">{titleText}</h3>
                <p className="text-sm text-gray-600 font-light text-justify">{descText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
