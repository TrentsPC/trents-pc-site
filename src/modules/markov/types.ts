export type MarkovRecord = {
  [from: string]: {
    [to: string]: number;
  };
};
