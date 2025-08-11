import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to dynamically generate a prompt based on user preferences
function generatePrompt({ genre, mood, language, count }) {
  return `
You are a smart book recommendation engine.
User preferences:
- Genre: ${genre}
- Mood: ${mood}
- Language: ${language}
- Number of recommendations: ${count}

Return only ${count} recommendations with:
- title
- author
- short description
- why it matches the mood and genre
`;
}

async function getBookRecommendations(userPreferences) {
  try {
    // Define structured output schema
    const schema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          author: { type: "string" },
          description: { type: "string" },
          matchReason: { type: "string" }
        },
        required: ["title", "author", "description", "matchReason"]
      }
    };

    // Create dynamic prompt
    const prompt = generatePrompt(userPreferences);

    // Get model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    // Send request
    const result = await model.generateContent(prompt);

    // Parse and return JSON
    const text = result.response.text();
    return JSON.parse(text);

  } catch (error) {
    console.error("Error fetching recommendations:", error);
  }
}

// Example usage
(async () => {
  const recommendations = await getBookRecommendations({
    genre: "Fantasy",
    mood: "Adventurous",
    language: "English",
    count: 3
  });

  console.log("📚 Recommended Books:", recommendations);
})();
