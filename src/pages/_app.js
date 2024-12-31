import "@/styles/globals.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Welcome To NoobAuth Client App</title>
        <link rel="icon" href="/noobauth.png" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
