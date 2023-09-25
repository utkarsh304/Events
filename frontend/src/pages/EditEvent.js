import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
    // const data = useLoaderData();
    const data = useRouteLoaderData("event-detail");            // Passing the id that we assigned in our route in App.js file.
    
    // const event = data.event;

    return (<EventForm method="patch" event={data.event}/>);    // method="patch" for editing events.
}

export default EditEventPage;