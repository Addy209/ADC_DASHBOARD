import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "../components/Login/login";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login {...props} />
    </>
  );
}
