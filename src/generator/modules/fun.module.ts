import type { FeatureModule } from '../types';
import { eightballTemplate } from '../../templates/fun/eightball.template';
import { diceTemplate } from '../../templates/fun/dice.template';
import { jokeTemplate } from '../../templates/fun/joke.template';
import { coinflipTemplate } from '../../templates/fun/coinflip.template';

export const funModule: FeatureModule = {
  id: 'fun',
  category: 'fun',
  label: 'Fun',
  description: 'Magic 8-ball, dice rolling, jokes, and coin flip',
  emoji: '🎮',
  commandFiles: [
    { filename: '8ball.js', subfolder: 'fun', render: eightballTemplate },
    { filename: 'dice.js', subfolder: 'fun', render: diceTemplate },
    { filename: 'joke.js', subfolder: 'fun', render: jokeTemplate },
    { filename: 'coinflip.js', subfolder: 'fun', render: coinflipTemplate },
  ],
  eventContributions: [],
  requiredIntents: ['Guilds', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'fun.8ball', label: 'Magic 8-Ball', description: 'Ask the magic 8-ball questions' },
    { id: 'fun.dice', label: 'Dice Roll', description: 'Roll dice (d6, NdN format)' },
    { id: 'fun.joke', label: 'Joke', description: 'Get a random joke' },
    { id: 'fun.coinflip', label: 'Coin Flip', description: 'Flip a coin' },
  ],
};
