type GameGlobals = {
  SCORE_MAX?: number;
  FALSE_FLAG?: undefined;
  CYCLOPS_FLAG?: undefined;
  DEFLATE?: undefined;
  DOME_FLAG?: undefined;
  EMPTY_HANDED?: undefined;
  LLD_FLAG?: undefined;
  LOW_TIDE?: undefined;
  MAGIC_FLAG?: undefined;
  RAINBOW_FLAG?: undefined;
  TROLL_FLAG?: undefined;
  WON_FLAG?: boolean;
  COFFIN_CURE?: undefined;
};

const FLAGS = [
  "RLANDBIT",
  "ONBIT",
  "SACREDBIT",
  "CONTBIT",
  "TRYTAKEBIT",
  "READBIT",
  "TAKEBIT",
  "BURNBIT",
  "TRANSBIT",
  "NDESCBIT",
  "TOUCHBIT",
  "DOORBIT",
] as const;
type GameFlag = typeof FLAGS[number];

const ROOM_GLOBALS = [
  "WHITE_HOUSE",
  "BOARD",
  "FOREST",
  "BOARDED_WINDOW",
] as const;
type RoomGlobal = typeof ROOM_GLOBALS[number];

type GameSyntaxObject = {
  optional?: boolean;
  /**
   * Find implied object
   */
  find?: GameFlag;
  /**
   * can be any object, not just visible ones
   */
  everywhere?: boolean;
  onGround?: boolean;
  inRoom?: boolean;
  held?: boolean;
  carried?: boolean;
  take?: boolean;
};
type GameSyntax = {
  text: string;
  objects?: GameSyntaxObject[];
  action: string;
};

type GameObject = {
  id: string;
  in?: string;
  synonyms: string[];
  adjectives?: string[];
  description: string;
  longDescription?: string;
  flags?: GameFlag[];
  capacity?: number;
  action?: () => void;
  text?: string;
};

type RoomAction = (reason?: "M_LOOK") => void;
type NavigateFn = () => string | void;

type GameRoom = {
  id: string;
  description: string;
  longDescription?: string;
  north?: NavigateFn;
  south?: NavigateFn;
  ne?: NavigateFn;
  se?: NavigateFn;
  west?: NavigateFn;
  east?: NavigateFn;
  sw?: NavigateFn;
  in?: NavigateFn;
  action?: RoomAction;
  flags?: GameFlag[];
  globals?: RoomGlobal[];
};

export type TellOptions = {
  bold?: boolean;
};
export type TellListener = (text: string, options: TellOptions) => void;

let VALID_DIRECTIONS = [
  "NORTH",
  "SOUTH",
  "EAST",
  "WEST",
  "NW",
  "NE",
  "SW",
  "SE",
  "UP",
  "DOWN",
  "IN",
  "OUT",
  "LAND",
];

/**
 * Called Buzzwords in the OG, these words can be removed from requests
 */
const STOP_WORDS = [
  "AGAIN",
  "G",
  "OOPS",
  "A",
  "AN",
  "THE",
  "IS",
  "AND",
  "OF",
  "THEN",
  "ALL",
  "ONE",
  "BUT",
  "EXCEPT",
  ".",
  ",",
  '"',
  "YES",
  "NO",
  "Y",
  "HERE",
];

function getFirstWord(str: string) {
  let [first] = str.split(" ");
  return first;
}

class Zork {
  globals: GameGlobals = {};
  rooms: {
    [roomID: string]: GameRoom;
  } = {};
  objects: {
    [objectID: string]: GameObject;
  } = {};
  inventory: GameObject[] = [];
  verbs: {
    [verbID: string]: (zork: Zork) => void;
  } = {};
  syntax: GameSyntax[] = [];
  synonyms: Record<string, string> = {};
  here: string = "WEST_OF_HOUSE";

  // ACTION
  verb?: string;
  directObject?: string;
  indirectObject?: string;

  // CLIENTS
  listeners: TellListener[] = [];
  // END

  // SET UP STATE
  setGlobal(key: keyof GameGlobals, value: any) {
    this.globals[key] = value;
  }

  addRoom(room: GameRoom) {
    this.rooms[room.id] = room;
  }

  addObject(object: GameObject) {
    this.objects[object.id] = {
      ...object,
      synonyms: object.synonyms.map((s) => s.toUpperCase()),
      adjectives: object.adjectives?.map((s) => s.toUpperCase()),
    };
  }

  addVerb(verb: string, action: (zork: Zork) => void) {
    this.verbs[verb] = action.bind(this);
  }

  addSynonym(to: string, ...froms: string[]) {
    for (let from of froms) {
      this.synonyms[from.toUpperCase()] = to.toUpperCase();
    }
  }

  addSyntax(syn: GameSyntax) {
    this.syntax.push(syn);
  }

  // UTIL
  perform(verb: string, directObject?: string, indirectObject?: string) {
    this.verb = verb;
    this.directObject = directObject;
    this.indirectObject = indirectObject;
    this.verbs[verb]?.(this);
  }

  tell(...parts: Array<string | boolean | null | undefined | TellOptions>) {
    let opts: TellOptions =
      (parts.find((p) => p && typeof p === "object") as TellOptions) || {};
    this.listeners.forEach((s) =>
      s(parts.filter((p) => p && typeof p === "string").join(""), opts)
    );
  }

  listen(listener: TellListener) {
    this.listeners.push(listener);
  }

  // PARSE
  go(rawRequest: string) {
    let request = rawRequest
      .toUpperCase()
      .trim()
      .split(/\s+/)
      .map((word) => this.synonyms[word] || word)
      .join(" ");

    let { text: requestTemplate, objects: foundObjects } = extractTemplate(
      request,
      Object.values(this.objects)
    );

    // Early return on direction
    if (VALID_DIRECTIONS.includes(request)) {
      this.perform("WALK", request);
      return;
    }
    if (
      request.startsWith("WALK ") &&
      VALID_DIRECTIONS.includes(request.slice(5))
    ) {
      this.perform("WALK", request.slice(5));
      return;
    }

    for (let sentence of this.syntax) {
      if (!sentence.objects?.length) {
        // EXACT MATCH
        if (request === sentence.text) {
          this.perform(sentence.action);
          return;
        }
      } else {
        if (requestTemplate !== sentence.text) {
          continue;
        }
        if (foundObjects.length !== sentence.objects.length) {
          continue;
        }
        return this.perform(
          sentence.action,
          foundObjects[0]?.id,
          foundObjects[1]?.id
        );
      }
    }

    this.tell(`Sorry, I don't know how to "${request}"`);
  }
}

const zork = new Zork();
zork.setGlobal("SCORE_MAX", 350);

export function extractTemplate(prompt: string, allObjects: GameObject[]) {
  let compiledWords: string[] = [];
  let promptWords = prompt
    .split(" ")
    .filter((word) => !STOP_WORDS.includes(word))
    .reverse();

  let foundObjects: GameObject[] = [];
  let currentObject: GameObject | undefined = undefined;

  for (let word of promptWords) {
    if (!currentObject) {
      let potential = allObjects.find((o) => o.synonyms.includes(word));
      if (potential) {
        foundObjects.unshift(potential);
        currentObject = potential;
        compiledWords.unshift("OBJECT");
      } else {
        compiledWords.unshift(word);
      }
    } else {
      if (currentObject.adjectives?.includes(word)) {
      } else {
        compiledWords.unshift(word);
        currentObject = undefined;
      }
    }
  }

  return { text: compiledWords.join(" "), objects: foundObjects };
}

export { zork };
