import { Suspense } from "react";
import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem"
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
    // const data = useLoaderData();
    // const data = useRouteLoaderData("event-detail");                   // Passing the id that we assigned in our route in App.js file.
    const { event, events } = useRouteLoaderData("event-detail");         // Passing the id that we assigned in our route in App.js file.

    return (
        <>
            <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}

export default EventDetailPage;

async function loadEvent(id) {
    const response = await fetch("http://localhost:8080/events/" + id);

    if (!response.ok) {
        throw json({ message: "Could not fetch details for selected event." }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: "Could not fetch events!" }, { status: 500 });    // json from react-router-dom.
    } else {
        const resData = await response.json();
        return resData;
    }
}

export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: loadEvent(id),
        events: loadEvents()
    });
}

export async function action({ request, params }) {
    const eventId = params.eventId;
    const response = await fetch("http://localhost:8080/events/" + eventId, {
        method: request.method
    });
    
    if (!response.ok) {
        throw json({ message: "Could not fetch details for selected event." }, { status: 500 });
    }
    return redirect("/events");
}