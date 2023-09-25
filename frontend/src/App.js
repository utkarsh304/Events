import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./pages/Home";
import EventDetailPage, { loader as eventDetailLoader, action as deleteEventAction } from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
// import NewEventPage, { action as newEventsAction } from "./pages/NewEvent";
import { action as manipulateEventAction } from "./components/EventForm";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootLayout from "./pages/EventsRoots";
import ErrorPage from "./pages/Error";
import NewsletterPage, { action as newsletterAction} from "./pages/Newsletter";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          // {
          //   index: true, element: <EventsPage />, loader: async () => {
          //     const response = await fetch('http://localhost:8080/events');

          //     if (!response.ok) {
          //       // ...
          //     } else {
          //       const resData = await response.json();
          //       return resData.events;
          //     }
          //   }
          // },

          // OR :-

          { index: true, element: <EventsPage />, loader: eventsLoader },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              { path: "edit", element: <EditEventPage />, action: manipulateEventAction }
            ]
          },
          { path: "new", element: <NewEventPage />, action: manipulateEventAction },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
