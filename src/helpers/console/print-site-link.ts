import chalk from 'chalk';
import { getSiteLink } from 'helpers/string';

type TPrintSiteLink = {
  link: string;
  anchor?: string;
  endText?: string;
};

export default ({ link, anchor, endText }: TPrintSiteLink) => {
  endText = endText || 'for more information.';

  return (
    '\n\nSee ' + chalk.blue.underline(getSiteLink(link, anchor)) + ' ' + endText
  );
};
