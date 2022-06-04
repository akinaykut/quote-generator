const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quotes From API

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catct Error Here
    console.log(err);
  }
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  let quote = apiQuotes[Math.floor(Math.random() * 1643)];
  quoteText.textContent = quote.text;
  // Check if Author field is blank and replace it with 'Anonymous'
  if (!quote.author) {
    authorText.textContent = "Anonymous";
  } else {
    authorText.textContent = quote.author;
  }
  // Hide loader
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
