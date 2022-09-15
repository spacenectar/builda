import { adjectives, nouns } from '@data/words.json';

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const randomWordGenerator = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${capitalize(adjective)}${capitalize(noun)}`;
};

export default randomWordGenerator;
