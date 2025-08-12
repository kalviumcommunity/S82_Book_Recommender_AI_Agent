import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Example function calling setup
async function runGeminiWithTokenCount() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Prompt
    const prompt = "List 5 popular science fiction books with authors.";

    // Generate content
    const result = await model.generateContent(prompt);

    // Display model output
    console.log("Response:\n", result.response.text());

    // Token usage info (Gemini's SDK returns usageMetadata)
    if (result.response.usageMetadata) {
      console.log("\n=== Token Usage ===");
      console.log("Prompt Tokens:", result.response.usageMetadata.promptTokenCount);
      console.log("Candidates Tokens:", result.response.usageMetadata.candidatesTokenCount);
      console.log("Total Tokens:", result.response.usageMetadata.totalTokenCount);
    } else {
      console.warn("⚠ No token usage data returned from API.");
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

runGeminiWithTokenCount();
