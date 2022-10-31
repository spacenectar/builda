import { BoxItem } from 'lib/types/box-item';

export const getTrueItemCount = (items: BoxItem[]): number => {
  return items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
};

export default getTrueItemCount;
