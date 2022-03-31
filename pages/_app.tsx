import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    let api = "https://dry-hollows-28901.herokuapp.com";
    return (
        <Layout>
            <Component {...pageProps} api={api} />
        </Layout>
    );
}

export default MyApp;
