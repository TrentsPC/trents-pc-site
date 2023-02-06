// import { TRAINING_DATA } from "./trainingData";
import { MarkovRecord } from "./types";

const START_TOKEN = "<|START|>";
const LINE_BREAK = "<|BR|>";
const END_TOKEN = "<|END|>";

function createWordStream(data: string) {
  let sets = data
    .split(/\n{2,}/)
    .flatMap((set) => [
      START_TOKEN,
      ...set.replaceAll("\n", ` ${LINE_BREAK} `).split(/\s+/),
      END_TOKEN,
    ]);
  return sets;
}

function buildMarkovRecord(words: string[]) {
  let result: MarkovRecord = {};

  function addRecord(from: string, to: string) {
    if (!result[from]) {
      result[from] = {};
    }
    if (!result[from][to]) {
      result[from][to] = 1;
    } else {
      result[from][to] += 1;
    }
  }

  words.forEach((word, i) => {
    if (word === END_TOKEN) return;
    let nextWord = words[i + 1];
    if (!nextWord) nextWord = END_TOKEN;
    addRecord(word, nextWord);
  });
  return result;
}

export function generateChain(record: MarkovRecord, initialWords?: string[]) {
  let words = initialWords || [START_TOKEN];

  let lastWord = words[words.length - 1];
  while (lastWord !== END_TOKEN) {
    let optionsEntries = Object.entries(record[lastWord]);
    let totalWeight = sum(optionsEntries.map((e) => e[1]));
    let random = Math.random() * totalWeight;
    let cumWeight = 0;
    let chosenOption = "";

    for (let i = 0; i < optionsEntries.length; i++) {
      let [option, weight] = optionsEntries[i];
      cumWeight += weight;
      if (random < cumWeight) {
        chosenOption = option;
        break;
      }
    }

    words.push(chosenOption);

    lastWord = words[words.length - 1];
  }

  return words.slice(1, -1).join(" ").replaceAll(` ${LINE_BREAK} `, "\n");
}

// const record = buildMarkovRecord(createWordStream(TRAINING_DATA));
// console.log(JSON.stringify(record));
// console.log(generateChain(record));
// console.log(generateChain(record));
// console.log(generateChain(record));
// console.log(generateChain(record));
// console.log(generateChain(record));

function sum(nums: number[]) {
  return nums.reduce((prev, curr) => prev + curr, 0);
}
