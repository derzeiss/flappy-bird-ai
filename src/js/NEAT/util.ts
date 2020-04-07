export const randFloat = (min: number, max: number): number => min + Math.random() * (max - min);
export const randInt = (min: number, max: number): number => Math.round(randFloat(min, max));
export const chooseRandom = (arr: Array<any>) => arr[randInt(0, arr.length)];
