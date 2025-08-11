import fs from 'fs';

// Load and parse the sampleResponses.json file
const data = fs.readFileSync('./sampleResponses.json', 'utf8');
const responses = JSON.parse(data);

// Test: Print each book in a readable format
responses.forEach((book, index) => {
  console.log(`\nBook ${index + 1}:`);
  console.log(`📘 Title: ${book.title}`);
  console.log(`✍ Author: ${book.author}`);
  console.log(`🏷 Genre: ${book.genre}`);
  console.log(`📝 Summary: ${book.summary}`);
});