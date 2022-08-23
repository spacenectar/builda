import SiteType from './site-type';
import { Room } from './room';
import { Box } from './box';

type TAddress = {
  uuid: string;
  name: string;
  firstLine: string;
  secondLine: string;
  city: string;
  county: string;
  postcode: string;
  createdAt: string;
  updatedAt: string;
};

export interface Site {
  uuid: string;
  name: string;
  type: SiteType;
  address: TAddress;
  createdAt: string;
  updatedAt: string;
  rooms: Room[];
  boxes: Box[];
}
