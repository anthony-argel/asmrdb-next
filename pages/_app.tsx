import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { useCallback, useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    let api = "https://dry-hollows-28901.herokuapp.com";

    const verifyToken = useCallback(() => {
        if (localStorage.getItem("token") === null) {
            return;
        }

        fetch(api + "/user/verify", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.status === 403 || res.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
        });
    }, [api]);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    return (
        <Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} api={api}>
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
