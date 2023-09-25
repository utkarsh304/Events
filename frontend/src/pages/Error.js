import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

const ErrorPage = () => {
    const error = useRouteError();               // useRouteError(); returns an object and object depends on weather we throw any response or error.

    let title = "An error occourred!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        // message = JSON.parse(error.data).message;
        message = error.data.message;            // While using json from react-router-dom.
    }

    if (error.status === 404) {
        title = "Not found!";
        message = "Could not find resource or page!";
    }

    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default ErrorPage;