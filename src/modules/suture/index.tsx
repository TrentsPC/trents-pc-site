import { CreateSuture, CSS, CSSProperties } from "./types";
import { Suture } from "./types/suture";

export const createSuture = ((options: any) => {
  const keyframes: Suture["keyframes"] = () => {
    throw new Error("`Suture`: Vite plugin not installed correctly");
  };

  const css: Suture["css"] = () => {
    throw new Error("`Suture`: Vite plugin not installed correctly");
  };

  return {
    config: {
      media: options?.media || {},
      utils: options?.utils || {},
    },
    keyframes,
    css,
  };
}) as CreateSuture;

export interface Register {
  theme: any;
}

export const theme: Register["theme"] = new Proxy(
  {},
  {
    get: (target, prop) => {
      throw new Error("`Suture`: Vite plugin not installed correctly");
    },
  }
);

export { CSS, CSSProperties };
