import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runStructuredOutput() {
  // Define schema for structured output
  const schema = {
    description: "Book recommendation with metadata",
    type: SchemaType.OBJECT,
    properties: {
      title: { type: SchemaType.STRING, description: "Book title" },
      author: { type: SchemaType.STRING, description: "Author of the book" },
      genre: { type: SchemaType.STRING, description: "Genre of the book" },
      rating: { type: SchemaType.NUMBER, description: "Rating from 0 to 5" }
    },
    required: ["title", "author", "genre", "rating"]
  };

  // Create model with structured output config
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  // Call model
  const prompt = "Recommend a sci-fi book with its title, author, genre, and rating.";
  const result = await model.generateContent(prompt);

  // Output parsed JSON
  console.log("Structured Output:", JSON.parse(result.response.text()));
}

runStructuredOutput().catch(console.error);
