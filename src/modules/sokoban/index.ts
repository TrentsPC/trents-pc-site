import { isServer } from "solid-js/web";
import { MICROBAN1 } from "./levelsets";
import { Position, SokobanLevel } from "./types";

function parseLevel(levelStr: string): SokobanLevel {
  const crates: Position[] = [];
  const rows = levelStr.split("\n");
  let player = { x: 0, y: 0 };
  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === "@" || char === "+") {
        player = { x, y };
      }
      if (char === "$" || char === "*") {
        crates.push({ x, y });
      }
    });
  });

  return {
    level: levelStr
      .replaceAll("*", ".")
      .replaceAll("+", ".")
      .replaceAll("@", " ")
      .replaceAll("$", " ")
      .split("\n"),
    crates,
    player,
  };
}

function parseLevelSet(levelSetStr: string) {
  let parts = levelSetStr.split("\n\n").filter((p) => !p.startsWith(";"));

  return parts.map(parseLevel);
}

const recolor = {
  // Empty
  " ": "⬛️",
  // Hole
  ".": "🔘",
  // Player
  "@": "😎",
  // Wall
  "#": "⬜️",
  // Crate
  $: "📦",
  // Crate on hole
  "*": "🎁",
  // Player on hole
  "+": "😳",
} as Record<string, string>;

class Sokoban {
  levelIdx = 0;
  levelRows: string[] = [];
  crates: Position[] = [];
  player: Position = { x: -1, y: -1 };

  loadLevel(level: SokobanLevel) {
    this.levelRows = level.level;
    this.crates = [...level.crates.map((c) => ({ ...c }))];
    this.player = { ...level.player };
  }

  atPosition(x: number, y: number) {
    let levelBit = this.levelRows[y].charAt(x);
    if (levelBit === "#") return "WALL";
    if (this.crates.some((c) => c.x === x && c.y === y)) {
      return "CRATE";
    }
    return "AIR";
  }

  moveCrate(fromX: number, fromY: number, x: number, y: number) {
    let crateIdx = this.crates.findIndex((c) => c.x === fromX && c.y === fromY);
    if (crateIdx === -1) return true;
    if (this.atPosition(x, y) !== "AIR") {
      return false;
    } else {
      this.crates[crateIdx] = { x, y };
      return true;
    }
  }

  checkWin() {
    for (let crate of this.crates) {
      let levelBit = this.levelRows[crate.y].charAt(crate.x);
      if (levelBit !== ".") {
        return false;
      }
    }
    this.render();
    this.levelIdx++;
    this.loadLevel(levels[this.levelIdx]);
    console.warn("COMPLETE!!!1");
    console.warn("COMPLETE!!!1");
    console.warn("COMPLETE!!!1");
  }

  render() {
    let result = `Level ${this.levelIdx + 1}:\n\n`;
    this.levelRows.forEach((row, y) => {
      row.split("").forEach((char, x) => {
        if (char === ".") {
          if (this.crates.some((c) => c.x === x && c.y === y)) {
            char = "*";
          }
          if (this.player.x === x && this.player.y === y) {
            char = "+";
          }
        } else {
          if (this.crates.some((c) => c.x === x && c.y === y)) {
            char = "$";
          }
          if (this.player.x === x && this.player.y === y) {
            char = "@";
          }
        }
        result += recolor[char];
      });
      result += "\n";
    });
    console.log(result);
  }

  restart() {
    this.loadLevel(levels[this.levelIdx]);
    this.render();
  }

  up() {
    let to = this.atPosition(this.player.x, this.player.y - 1);
    if (to === "AIR") {
      this.player.y--;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x,
          this.player.y - 1,
          this.player.x,
          this.player.y - 2
        )
      ) {
        this.player.y--;
      }
    }
    this.checkWin();
    this.render();
  }
  down() {
    let to = this.atPosition(this.player.x, this.player.y + 1);
    if (to === "AIR") {
      this.player.y++;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x,
          this.player.y + 1,
          this.player.x,
          this.player.y + 2
        )
      ) {
        this.player.y++;
      }
    }
    this.checkWin();
    this.render();
  }
  left() {
    let to = this.atPosition(this.player.x - 1, this.player.y);
    if (to === "AIR") {
      this.player.x--;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x - 1,
          this.player.y,
          this.player.x - 2,
          this.player.y
        )
      ) {
        this.player.x--;
      }
    }
    this.checkWin();
    this.render();
  }
  right() {
    let to = this.atPosition(this.player.x + 1, this.player.y);
    if (to === "AIR") {
      this.player.x++;
    } else if (to === "CRATE") {
      if (
        this.moveCrate(
          this.player.x + 1,
          this.player.y,
          this.player.x + 2,
          this.player.y
        )
      ) {
        this.player.x++;
      }
    }
    this.checkWin();
    this.render();
  }
}

const sokoban = new Sokoban();
const levels = parseLevelSet(MICROBAN1);
if (!isServer) {
  sokoban.loadLevel(levels[0]);
  sokoban.render();
  console.log("control using `w`, `a`, `s`, `d`, restart with `r`.");

  function registerCommand(fn: () => void, names: string) {
    var evaluate = function (cmd: any, args: any) {
      fn.apply(sokoban, args);
    };
    names.split(",").forEach(function (cmd) {
      var obj = {
        get: function () {
          return evaluate(cmd, arguments);
        },
      };
      Object.defineProperty(window, cmd, obj);
    });
  }
  registerCommand(() => sokoban.up(), "w,W,up");
  registerCommand(() => sokoban.down(), "s,S,down");
  registerCommand(() => sokoban.left(), "a,A,left");
  registerCommand(() => sokoban.right(), "d,D,right");
  registerCommand(() => sokoban.restart(), "r,R,restart");
}
