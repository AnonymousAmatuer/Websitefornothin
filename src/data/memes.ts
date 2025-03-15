
export interface MemeData {
  id: number;
  topText: string;
  bottomText?: string;
  rotation: number;
  background: string;
  width: string;
  height: string;
}

export const memes: MemeData[] = [
  {
    id: 1,
    topText: "WHEN GAB FIXES A BUG",
    bottomText: "AND CREATES 10 MORE",
    rotation: -3,
    background: "bg-neon-green",
    width: "w-80",
    height: "h-60"
  },
  {
    id: 2,
    topText: "GAB'S CODE AT 3AM",
    bottomText: "PERFECTLY LOGICAL",
    rotation: 2,
    background: "bg-neon-pink",
    width: "w-72",
    height: "h-64"
  },
  {
    id: 3,
    topText: "GAB EXPLAINING WHY",
    bottomText: "HIS SOLUTION NEEDS 15 NPM PACKAGES",
    rotation: -2,
    background: "bg-neon-blue",
    width: "w-80",
    height: "h-56"
  },
  {
    id: 4,
    topText: "GAB WAITING FOR",
    bottomText: "HIS CODE TO COMPILE",
    rotation: 3,
    background: "bg-neon-yellow",
    width: "w-64",
    height: "h-64"
  },
  {
    id: 5,
    topText: "GAB'S SEARCH HISTORY:",
    bottomText: "HOW TO EXIT VIM (49,372 TIMES)",
    rotation: -1,
    background: "bg-neon-orange",
    width: "w-80",
    height: "h-56"
  }
];
