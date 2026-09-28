import readline from 'node:readline/promises';      /// imports node ka built-in terminal input functionality - helps interact with terminal
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({     //creates terminal
  input,  
  output
});
const color1 ='\x1b[33m';  //yellow
const reset = '\u001b[0m';  // sets to original formatting

export async function getUserInput() {      // funct() to get userInput
  const answer = await rl.question(`${color1} You ${reset}`);      //waits for us to type something // 
  return answer;
}

export function closeTerminal() {
  rl.close();
}