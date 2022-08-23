import { BoxItem } from './box-item';
import { Room } from './room';
export interface Box {
  uuid: string;
  boxNumber: number;
  room: Room;
  sourceID: string;
  destinationID: string;
  currentLocationID: string;
  percentFilled?: number;
  sealed?: boolean;
  contents: BoxItem[] | [];
  createdAt: string;
  updatedAt: string;
}
