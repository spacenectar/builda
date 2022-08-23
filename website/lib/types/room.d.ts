import ColourChoices from './colour-choices';

export interface Room {
  uuid: string;
  name: string;
  siteID: string;
  colour: ColourChoices;
  createdAt: string;
  updatedAt: string;
}
