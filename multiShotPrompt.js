import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function multiShotPrompting(retryCount = 3) {
  const prompt = `
You are a book recommendation assistant.  
I will give you a genre, and you must recommend one book with the author and a short description.  
Follow the example format exactly.

Example 1:
Genre: Science Fiction  
Recommendation: "Dune" by Frank Herbert — A sweeping epic of politics, religion, and ecology set on the desert planet Arrakis.

Example 2:
Genre: Mystery  
Recommendation: "The Hound of the Baskervilles" by Arthur Conan Doyle — Sherlock Holmes investigates a family curse involving a legendary hound.

Now it's your turn.

Genre: Fantasy
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    console.log("📚 Recommendation:");
    console.log(result.response.text());
  } catch (error) {
    console.error(`❌ Error: ${error.status} ${error.statusText}`);
    if (error.status === 503 && retryCount > 0) {
      console.log(`🔄 Retrying... attempts left: ${retryCount}`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2 sec
      return multiShotPrompting(retryCount - 1);
    }
  }
}

multiShotPrompting();
