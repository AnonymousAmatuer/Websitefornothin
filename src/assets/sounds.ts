
interface Sound {
  name: string;
  path: string;
  volume: number;
}

const sounds: Sound[] = [
  { name: 'airhorn', path: '/airhorn.mp3', volume: 0.3 },
  { name: 'wow', path: '/wow.mp3', volume: 0.4 },
  { name: 'fail', path: '/fail.mp3', volume: 0.4 },
  { name: 'evil-laugh', path: '/evil-laugh.mp3', volume: 0.3 },
  { name: 'fart', path: '/fart.mp3', volume: 0.5 },
  { name: 'bonk', path: '/bonk.mp3', volume: 0.4 },
  { name: 'tada', path: '/tada.mp3', volume: 0.4 },
];

export const playRandomSound = (): void => {
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  const audio = new Audio(sound.path);
  audio.volume = sound.volume;
  audio.play().catch(e => console.error('Audio play failed:', e));
};
