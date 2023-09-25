import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

const EventsPage = () => {

    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
            <Await resolve={events}>
                {(loadEvents) => <EventsList events={loadEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: "Could not fetch events!" }, { status: 500 });    // json from react-router-dom.
    } else {
        const resData = await response.json();
        return resData;
    }
}

export function loader() {
    return defer({
        events: loadEvents()
    });
}