
export const gabFacts = [
  "Gab secretly has a collection of 457 rubber ducks, each with a different profession.",
  "When Gab sleeps, his hair keeps coding without him.",
  "Gab doesn't actually exist. He's an AI created to convince people that programming is fun.",
  "Gab can type 500 words per minute, but only in Klingon.",
  "Gab once defeated a chess computer by intimidating it with his stare.",
  "Scientists have proven that Gab's coffee mug contains a black hole.",
  "Gab has never actually seen his own reflection - mirrors crash when he looks at them.",
  "The 'G' in 'Gab' stands for 'Gravity-defying hair'.",
  "Gab doesn't use Google. Google asks Gab for answers.",
  "When Gab enters a room, all the electronics whisper to each other.",
  "Gab knows exactly what covfefe means.",
  "Gab can understand stack overflow answers without reading the question.",
  "Gab's keyboard doesn't have a Caps Lock. When he wants capitals, the letters are too afraid to stay lowercase.",
  "Gab doesn't compile code. He just stares at it until it runs out of fear.",
  "Gab's brain has more cores than the latest Intel processor.",
  "Gab communicates with aliens using CSS flexbox.",
  "When Gab gets a 404 error, it's because the website is afraid to show itself.",
  "Gab doesn't need headphones. The music is too afraid to leak out of his speakers.",
  "Gab can delete the recycling bin.",
  "Gab's selfies break Instagram's algorithm.",
  "Gab's code doesn't have bugs, just undocumented features.",
  "Gab told a joke so funny, Internet Explorer got it immediately.",
  "Gab's computer never updates - it knows better.",
  "Gab never loses his WiFi connection. The router follows him everywhere.",
  "Gab can divide by zero. Twice.",
  "Gab's shadow has its own Instagram account with more followers than him.",
  "Gab once won a staring contest with his webcam.",
  "Gab doesn't need a password manager. Passwords reveal themselves to him voluntarily.",
  "Gab doesn't open incognito mode. Incognito mode opens Gab."
];

export const getRandomFact = (): string => {
  return gabFacts[Math.floor(Math.random() * gabFacts.length)];
};
