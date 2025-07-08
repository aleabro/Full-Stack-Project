import Cards from "./cards";
import Accordion from "./accordion";
import Newsletter from "./newsletter";
import Carousel from "./carousel";

export default function HomePage({ events, filteredEvents }) {

  return (
    <>
      <Newsletter />
      <Carousel events={events} />
      <Cards events={filteredEvents} />
      <Accordion />
      
    </>
  );
}