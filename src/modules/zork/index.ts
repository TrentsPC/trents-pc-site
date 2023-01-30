import { isServer } from "solid-js/web";
import { extractTemplate, zork } from "./zMachine";

import "./syntax";
import "./1dungeon";
import "./globals";

import "./verbs";

// <INSERT-FILE "GMACROS" T>
// <INSERT-FILE "GSYNTAX" T>
// <INSERT-FILE "1DUNGEON" T>
// <INSERT-FILE "GGLOBALS" T>

// <PROPDEF SIZE 5>
// <PROPDEF CAPACITY 0>
// <PROPDEF VALUE 0>
// <PROPDEF TVALUE 0>

// <INSERT-FILE "GCLOCK" T>
// <INSERT-FILE "GMAIN" T>
// <INSERT-FILE "GPARSER" T>
// <INSERT-FILE "GVERBS" T>
// <INSERT-FILE "1ACTIONS" T>

/**
 * TYPESAFETY LEVELS CRITICALLY LOW!!!
 */

if (!isServer) {
  // @ts-ignore
  window.perform = zork.perform;
  // @ts-ignore
  window.go = zork.go.bind(zork);
}

zork.here = "WEST_OF_HOUSE";
