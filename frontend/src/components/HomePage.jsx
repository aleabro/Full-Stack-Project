import Cards from "./cards";
import Accordion from "./accordion";
import Newsletter from "./newsletter";
import Carousel from "./carousel";
import { useState } from "react";

export default function HomePage({ events, filteredEvents }) {
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleSubscribe = async (email) => {
  try {
    const response = await fetch("/api/newsletter/subscribe/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
    const data = await response.json();
    console.log("Risposta API:", response.status, data); 
    if (response.ok) {
      setNewsletterMessage("Iscrizione avvenuta con successo!");
    } else {
      setNewsletterMessage(data.message || "Errore durante l'iscrizione.");
    }
  } catch (err) {
    setNewsletterMessage("Errore di rete.");
  }
};

  return (
    <>
      <Newsletter
        onSubscribe={handleSubscribe} 
        newsletterMessage={newsletterMessage} 
      />
      <Carousel events={events} />
      <Cards events={filteredEvents} />
      <Accordion />
    </>
  );
}