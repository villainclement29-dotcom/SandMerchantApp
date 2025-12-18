import { atom } from "nanostores";

export const sand = atom(0);

export function setSand() {
  sand.set(sand.get() + 1);
}
