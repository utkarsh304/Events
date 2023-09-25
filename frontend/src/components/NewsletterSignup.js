// import { Form } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
    const fetcher = useFetcher();                   // This hook is used when we want to use loader or action without making any transition
    const {data, state} = fetcher;
    useEffect(() => {
        if (state === "idle" && data && data.message) {
            window.alert(data.message);
        }
    },[data, state]);
    return (
        // <Form method="post" className={classes.newsletter}>
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
        // </Form>
    );
}

export default NewsletterSignup;