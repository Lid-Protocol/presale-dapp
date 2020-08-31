import { infuraIds } from './config';

export const getRandomInfuraId = () => {
  return infuraIds[Math.floor(Math.random() * 1000) % infuraIds.length];
};
