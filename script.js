let currentQuote = {};
let allQuotes = [];

function loadAllQuotes() {
  console.log("Starting to load quotes...");
  document.getElementById('quoteText').textContent = 'Loading magical wisdom from Hogwarts...';
  
  fetch('https://hp-api.herokuapp.com/api/quotes')
    .then(response => {
      console.log("Got response:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("Quotes loaded:", data.length);
      allQuotes = data;
      displayRandomQuote();
    })
    .catch(error => {
      console.error('Error loading quotes:', error);
      currentQuote = {
        text: "It is our choices that show what we truly are, far more than our abilities.",
        author: "Albus Dumbledore"
      };
      displayQuote();
    });
}

function displayRandomQuote() {
  if (allQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const quote = allQuotes[randomIndex];
    currentQuote = {
      text: quote.text,
      author: quote.character || 'Unknown'
    };
    displayQuote();
  }
}

function displayQuote() {
  document.getElementById('quoteText').textContent = '"' + currentQuote.text + '"';
  document.getElementById('quoteAuthor').textContent = '- ' + currentQuote.author;
}

document.getElementById('newQuoteBtn').addEventListener('click', function() {
  console.log("New Quote button clicked");
  if (allQuotes.length > 0) {
    displayRandomQuote();
  } else {
    alert('Still loading quotes... please wait!');
  }
});

document.getElementById('shareBtn').addEventListener('click', function() {
  console.log("Share button clicked");
  const quoteText = document.getElementById('quoteText').textContent;
  const quoteAuthor = document.getElementById('quoteAuthor').textContent;
  const shareText = quoteText + ' ' + quoteAuthor;
  alert('Share this:\n\n' + shareText);
});

loadAllQuotes();
