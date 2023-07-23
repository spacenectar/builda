import { adjectives, nouns } from 'data/words.json';

const randomNameGenerator = () => {
  const adjective = adjectives[
    Math.floor(Math.random() * adjectives.length)
  ] as string;
  const noun = nouns[Math.floor(Math.random() * nouns.length)] as string;
  return `${adjective.toLowerCase()}-${noun.toLowerCase()}`;
};

export default randomNameGenerator;
