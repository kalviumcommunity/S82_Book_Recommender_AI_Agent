// oneShotPrompt.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// One-shot prompt (system + example)
const systemPrompt = `
You are an AI Book Recommendation Assistant.
Given a user request, suggest books in JSON format.

Example:
User: "I like science-based space adventures."
AI: [
  {
    "title": "The Martian",
    "author": "Andy Weir",
    "genres": ["Science Fiction", "Survival"],
    "summary": "Astronaut stranded on Mars uses engineering skills to survive.",
    "why_this_book": "Engaging, realistic space survival story with humor."
  }
]
`;

// Replace with your actual request
const userPrompt = "I want emotional fantasy with strong female leads.";

async function runPrompt() {
  // Combine system + user prompts
  const prompt = `${systemPrompt}\n\nUser: "${userPrompt}"\nAI:`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

runPrompt();
