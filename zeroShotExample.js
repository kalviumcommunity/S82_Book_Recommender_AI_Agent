import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Create a Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function fetchAPIInfo() {
  const systemPrompt = `
You are an expert API evaluator with deep knowledge of book recommendation systems.
Given an API from the Book AI Recommender, assess it on three criteria:
1. Correctness – Does the API return accurate book recommendations based on user preferences or queries?
2. Efficiency – Is the response optimized for speed and minimal unnecessary data transfer?
3. Scalability – Can it handle increased traffic, large book datasets, and high-frequency recommendation requests?
`;

  const userPrompt = `
Evaluate the following Book AI Recommender API:

API Endpoint: https://api.bookai.com/recommend
Function: Returns a list of recommended books with details including title, author, genre, rating, and short summary based on the user's search query or reading history.
`;

  // Combine prompts for zero-shot evaluation
  const prompt = `${systemPrompt}\n\n${userPrompt}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

fetchAPIInfo();
