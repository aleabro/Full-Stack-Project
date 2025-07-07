import { useParams } from 'react-router-dom';
import Cards from '../components/cards';

export default function ProvinciaPage({ events }) {
  const { provincia } = useParams();

  if (!provincia) {
    return <div>Provincia non selezionata</div>;
  }

  const filteredEvents = Array.isArray(events)
    ? events.filter(event =>
        event.provincia &&
        typeof event.provincia === 'string' &&
        event.provincia.toLowerCase() === provincia.toLowerCase()
      )
    : [];

  return (
    <div>
      <Cards events={filteredEvents} />
    </div>
  );
}
