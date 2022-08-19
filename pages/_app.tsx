import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import DefaultLayout from "../components/Layout/defaultLayout";
import { store } from "../store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Exchange Market</title>
        <meta name="description" content="Exchange market example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  );
}

export default App;
