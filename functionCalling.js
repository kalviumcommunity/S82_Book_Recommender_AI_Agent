import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Backend function to recommend books based on genre and level
function getBookRecommendation({ genre, level }) {
  const data = {
    fantasy: {
      beginner: { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
      intermediate: { title: "The Hobbit", author: "J.R.R. Tolkien" },
      advanced: { title: "The Silmarillion", author: "J.R.R. Tolkien" }
    },
    sciFi: {
      beginner: { title: "Ender's Game", author: "Orson Scott Card" },
      intermediate: { title: "Dune", author: "Frank Herbert" },
      advanced: { title: "Foundation", author: "Isaac Asimov" }
    }
  };
  return data[genre]?.[level] || { title: "No match found", author: "N/A" };
}

async function run() {
  // Define the function declaration as Gemini expects
  const tools = [
    {
      functionDeclarations: [
        {
          name: "getBookRecommendation",
          description: "Get a book recommendation based on genre and reading level",
          parameters: {
            type: "object",
            properties: {
              genre: { type: "string", description: "e.g., fantasy, sciFi" },
              level: { type: "string", description: "beginner, intermediate, advanced" }
            },
            required: ["genre", "level"]
          }
        }
      ]
    }
  ];

  // Initialize model and start chat session with tools
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const chat = model.startChat({ tools });

  // Clear prompt instructing the AI to use the function
  const userPrompt = `Use the getBookRecommendation function to answer:
I'm looking for a fantasy book for an intermediate reader.`;

  // Send message with low temperature for deterministic response
  const response = await chat.sendMessage(userPrompt, { temperature: 0 });

  console.log("Full AI response:", JSON.stringify(response.response, null, 2));

  // Check if function call requested
  const toolCall = response.response.functionCalls?.[0];
  if (toolCall) {
    console.log("Function call detected:", toolCall.name, toolCall.arguments);

    // Execute backend function with parsed arguments
    const args = toolCall.arguments;
    const result = getBookRecommendation(args);

    // Send function result back to AI
    const final = await chat.sendMessage({
      functionResponse: {
        name: toolCall.name,
        response: result
      }
    });

    console.log("AI final response:", final.response.text());
  } else {
    // No function call — just print AI text response
    console.log("AI response:", response.response.text());
  }
}

run().catch(console.error);
