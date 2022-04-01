import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    let api = "https://dry-hollows-28901.herokuapp.com";

    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    return (
        <Layout>
            <Component
                {...pageProps}
                api={api}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
        </Layout>
    );
}

export default MyApp;
