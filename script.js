const author = document.querySelector("#author");
const quote = document.querySelector("#quote");
const quoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const loader = document.querySelector(".loader");
const container = document.querySelector(".quote-container");

const loading = () => {
  loader.hidden = false;
  container.hidden = true;
};
const complete = () => {
  loader.hidden = !false;
  container.hidden = !true;
};

let apiQuotes = [];

const addQuote = () => {
  let random = Math.floor(Math.random() * apiQuotes.length);

  let selectedQuote = apiQuotes[random].text;
  let selectedAuthor = "";

  apiQuotes[random].author === null
    ? (selectedAuthor = "Anonymous")
    : (selectedAuthor = apiQuotes[random].author);

  selectedQuote.length > 50
    ? quote.classList.add("long-quote")
    : quote.classList.remove("long-quote");

  quote.innerText = selectedQuote;
  author.innerText = selectedAuthor;
  complete();
};

const getQuotes = async () => {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    let response = await fetch(apiUrl);
    apiQuotes = await response.json();

    addQuote();
  } catch (error) {}
};

const tweetQuote = () => {
  window.open(
    `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`,
    "_blank"
  );
};

getQuotes();

quoteButton.addEventListener("click", addQuote);

twitterButton.addEventListener("click", tweetQuote);
