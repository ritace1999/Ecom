import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import "../styles/swiper.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="bottom-right-corner"
        reverseOrder={false}
        toastOptions={{ style: { background: "#183B56", color: "white" } }}
      />
    </>
  );
}
