import { generateText } from 'ai'; // Asks ai model to generate text {generateText() comes from AI}
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // allows AI SDK to help use gemini model

import dotenv from 'dotenv';
dotenv.config(); // reads env file to access gemini key

const google = createGoogleGenerativeAI({           // google provider helps communicate with gemini    
  apiKey: process.env.GEMINI_KEY       // gets geminiKey
});

export async function askGemini(prompt) {      // utility func() - sends prompt to gemini
  try {
    const response = await generateText({       // sends prompt
      model: google('gemini-3.1-flash-lite'),
      prompt: prompt                            
    });

    return response.text;

  } catch (error) {
    console.error("❌ Execution Error:", error.message);
  }
}