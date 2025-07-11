import Cards from "./cards";
import Accordion from "./accordion";
import Newsletter from "./newsletter";
import Carousel from "./carousel";
import Sorted from "./Sorted";
import PartnerLogos from "./PartnerLogos";
import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { getCategories, getProvinces, getOrganizations, getSortedEvents } from "../pages/EventFilter";



export default function HomePage({ events, filteredEvents, user, organizations}) {
  console.log("organizations in HomePage", organizations);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(user?.newsletter_subscription);
  const location = useLocation();
  
  const [sortByFuture, setSortByFuture] = useState("");
  const [sortByPast, setSortByPast] = useState("");

  const now = new Date();
  const futureEvents = filteredEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < now);

  const categories = getCategories(futureEvents);
  const provinces = getProvinces(futureEvents);
  const organizationsList = getOrganizations(futureEvents);

  const sortedFutureEvents = getSortedEvents(futureEvents, sortByFuture);
  const sortedPastEvents = getSortedEvents(pastEvents, sortByPast);

  useEffect(() => {
    setIsNewsletterSubscribed(user?.newsletter_subscription);
  }, [user]);

useEffect(() => {
    if (location.hash === "#FAQ") {
      const el = document.getElementById("FAQ");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);
  

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
      setIsNewsletterSubscribed(true)
    } else {
      setNewsletterMessage(data.message || "Errore durante l'iscrizione.");
    }
  } catch (err) {
    setNewsletterMessage("Errore di rete.");
  }
};

const handleUnsubscribe = async (email) => {
  try {
    const response = await fetch("/api/newsletter/unsubscribe/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    console.log("Risposta API:", response.status, data);
    if (response.ok) {
      setNewsletterMessage("Disiscrizione avvenuta con successo!");
      setIsNewsletterSubscribed(false)
    } else {
      setNewsletterMessage(data.message || "Errore durante la disiscrizione.");
    }
  } catch (err) {
    setNewsletterMessage("Errore di rete.");
  }
}

  return (
    <>
    {(!user || !organizations) && (
      <Newsletter
        user={user}
        onSubscribe={handleSubscribe} 
        onUnsubscribe={handleUnsubscribe}
        newsletterMessage={newsletterMessage} 
      />
    )}

      <Carousel events={events} />
      
      <Sorted
        user={user}
        sortBy={sortByFuture}
        setSortBy={setSortByFuture}
        categories={categories}
        provinces={provinces}
        organizations={organizationsList}
      />
      <Cards events={sortedFutureEvents} user={user} />
      <PartnerLogos organizations={organizations} />
      <Accordion />
      
    </>
  );
}