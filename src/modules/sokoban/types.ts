export type Position = {
  x: number;
  y: number;
};

export type SokobanLevel = {
  level: string[];
  crates: Array<Position>;
  player: Position;
};

export type SokobanLevelSet = SokobanLevel[];
