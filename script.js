let currentQuote = {};
let allQuotes = [];
let isLoading = false;

// Load all quotes when page first opens
function loadAllQuotes() {
  console.log("Loading all quotes from API...");
  document.getElementById('quoteText').textContent = 'Loading magical wisdom from Hogwarts...';
  isLoading = true;
  
  fetch('https://hp-api.herokuapp.com/api/quotes')
    .then(response => response.json())
    .then(data => {
      console.log("Successfully loaded " + data.length + " quotes");
      allQuotes = data;
      isLoading = false;
      displayRandomQuote();
    })
    .catch(error => {
      console.error('Error loading quotes:', error);
      isLoading = false;
      // Fallback quote if API fails
      currentQuote = {
        text: "It is our choices that show what we truly are, far more than our abilities.",
        author: "Albus Dumbledore"
      };
      displayQuote();
    });
}

// Display a random quote from the loaded quotes
function displayRandomQuote() {
  if (allQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[randomIndex];
    currentQuote = {
      text: quote.text,
      author: quote.character || 'Unknown Character'
    };
    displayQuote();
  } else {
    document.getElementById('quoteText').textContent = 'No quotes available yet...';
  }
}

// Show the quote on screen
function displayQuote() {
  document.getElementById('quoteText').textContent = '"' + currentQuote.text + '"';
  document.getElementById('quoteAuthor').textContent = '- ' + currentQuote.author;
}

// When "Get New Quote" button is clicked
document.getElementById('newQuoteBtn').addEventListener('click', function() {
  console.log("Get New Quote button clicked");
  
  if (isLoading) {
    alert('Still loading quotes, please wait a moment!');
    return;
  }
  
  if (allQuotes.length > 0) {
    displayRandomQuote();
  } else {
    alert('Quotes are still loading. Please wait and try again!');
  }
});

// When "Share Quote" button is clicked
document.getElementById('shareBtn').addEventListener('click', function() {
  console.log("Share button clicked");
  const quoteText = document.getElementById('quoteText').textContent;
  const quoteAuthor = document.getElementById('quoteAuthor').textContent;
  const shareText = quoteText + ' ' + quoteAuthor + '\n\n🪄 Harry Potter Quotes App';
  
  alert('Share this:\n\n' + shareText);
});

// Start loading quotes when page opens
loadAllQuotes();
