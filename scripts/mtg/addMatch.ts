// Current input file comes from: https://console.firebase.google.com/u/0/project/react-site-inder/database/react-site-inder/data/~2Fcompetitive
// Run with: npx ts-node addMatch.ts

// G -> Tribe
// T -> Theme
// C -> Companion

import readline from "readline";
import fs from "fs";

import current from "./react-site-inder-competitive-export.json";

const OUTPUT_FILE = "./save.json";
const START_PROMPT = "Hit enter to start";
const WINNER_PROMPT = "Winner: ";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const players = {
  Alberto: "",
  Gary: "",
  Inderpreet: "",
  Richard: "",
};
const names = Object.keys(players);
let i = 0;
let winner = "";

const getNewGame = () => {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1;

  const result = { day, month, players };

  if (!winner) {
    return result;
  }

  return { ...result, winner };
};

const addMatch = () => {
  const copy = [...current];
  const currentSeason = copy[copy.length - 1];

  const newGame = getNewGame();
  currentSeason.games.push(newGame);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(copy, null, 2));
};

rl.on("line", (line) => {
  const prompt = rl.getPrompt();

  if (prompt === START_PROMPT) {
    rl.setPrompt(`${names[i]}: `);
    rl.prompt();
    return;
  }

  if (prompt === WINNER_PROMPT) {
    winner = line;
    rl.close();
    addMatch();
    return;
  }

  i++;
  const name = prompt.split(":")[0];
  if (names.includes(name)) {
    if (!line) {
      // @ts-ignore
      delete players[name];
    } else {
      // @ts-ignore
      players[name] = line;
    }
  }

  if (i >= names.length) {
    rl.setPrompt(WINNER_PROMPT);
    rl.prompt();
  } else {
    rl.setPrompt(`${names[i]}: `);
    rl.prompt();
  }
});

rl.setPrompt(START_PROMPT);
rl.prompt();
