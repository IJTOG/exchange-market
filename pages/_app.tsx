import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import DefaultLayout from "../components/Layout/defaultLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Exchange Market</title>
        <meta name="description" content="Exchange market example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </>
  );
}

export default App;
