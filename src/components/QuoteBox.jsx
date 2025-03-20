import React, { useState, useEffect } from "react";

const QuoteBox = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // Función para obtener una cita aleatoria
  const fetchQuote = async () => {

    try {
      const response = await fetch('https://dummyjson.com/quotes');
      if (!response.ok) {
        throw new Error("No se pudo obtener la cita");
      }
      const data = await response.json();

      const randomIndex = Math.floor(Math.random() * data["quotes"].length);

      setQuote(data["quotes"][randomIndex]["quote"]);
      setAuthor(data["quotes"][randomIndex]["author"] || "Unknown");
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("No se pudo cargar la cita. Intenta de nuevo más tarde.");
      setAuthor("Error");
    }
    
  };
  

  // Obtener una cita al cargar el componente
  useEffect(() => {
    fetchQuote();
  }, []);

  // URL para tuitear la cita
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;

  return (
    <div id="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <button id="new-quote" onClick={fetchQuote}>
        Nueva Cita
      </button>
      <a
        id="tweet-quote"
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Twittear
      </a>
    </div>
  );
};

export default QuoteBox;