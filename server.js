import { askGemini } from './gemini.js';
import { getUserInput, closeTerminal } from './terminal.js';

const blue = '\x1b[34m';
const red = '\x1b[31m';
const reset = '\x1b[0m';  // used to stop current color formatting in ANSI and return to original color.

async function main() {

  while (true) {     

    const userInput = await getUserInput();

    if (userInput.toLowerCase() === 'exit') {  
      closeTerminal();
      console.log(`${red}Your chat ends here...${reset}`);
      break;
    }

    const response = await askGemini(userInput);       //gets user's input
    console.log(`${blue}✓ AI ${response}${reset}`);

  }

}

main();

