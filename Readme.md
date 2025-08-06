#  AI Book Recommender Agent

An intelligent book recommendation AI powered by Retrieval-Augmented Generation (RAG), prompt engineering, structured outputs, and function calling.

---

##  Project Overview

This project is a smart conversational AI agent that helps users discover new books tailored to their interests. It understands user preferences, retrieves relevant book data, and generates accurate and structured book suggestions using advanced AI techniques.

---

##  Project Description

The AI Book Recommender Agent works by combining:

- **RAG (Retrieval-Augmented Generation):**  
  Retrieves relevant book data from a knowledge base or book API (like OpenLibrary, Google Books) and feeds it to the LLM to improve relevance.

- **Prompting:**  
  Uses well-crafted, dynamic prompts to understand the user’s preferences such as genre, author, or mood.

- **Structured Output:**  
  Returns book recommendations in JSON format with fields like title, author, summary, and genre for easy UI integration.

- **Function Calling:**  
  Uses function calls to fetch book ratings, availability, or author bios when needed during the chat.

This makes the agent capable of both deep conversational understanding and dynamic retrieval of real-world book information.

---

##  Tech Stack

- **Language Model:** OpenAI GPT-4 / Gemini Pro
- **Frameworks:** LangChain / LlamaIndex
- **Data Sources:** OpenLibrary API / custom book database
- **Backend:** Python (FastAPI / Flask)
- **Frontend (optional):** React

---

##  Use Cases

- Personalized book recommendations for readers
- Smart library assistants
- Bookstore chatbot integration
- Reading app integrations

---

##  Features

- Chat-based interface to understand reader’s mood or preferences
- Live retrieval of latest or trending books
- Structured JSON output for frontend display
- Real-time function calls for ratings, reviews, author info


