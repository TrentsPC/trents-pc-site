/**
 * Key names inspired from `.sm` file format
 */
export type Chart = {
  title: string;
  subtitle?: string;
  artist?: string;
  lyrics?: Lyric[];
  music: string;
  offset: number;
  bpm: number;
  notes: Note[];
};

export type Note = {
  beat: number;
  column: number;
  shift?: number;
  caught?: boolean;
};

export type Lyric = {
  start: number;
  end?: number;
  words: Array<{
    start: number;
    word: string;
  }>;
};
