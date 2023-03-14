import Head from "next/head";
import styles from "../styles/Home.module.css";
import { app } from "../firebaseConfig";
import { useEffect } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import Router from "next/router";
import { useState } from "react";

export default function Register() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const router = Router;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      console.log(response.user);
       sessionStorage.setItem('Token', response.user.accessToken);
      router.push('/home');
    });
  };

  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((response) => {
      sessionStorage.setItem("Token", response.user.accessToken);
      console.log(response.user);
      router.push('/home')
    });
  };

  const signUpWithGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((response) => {
        sessionStorage.setItem("Token", response.user.accessToken);
        console.log(response.user);
        Router.push('/home');
      })
      .catch((err) => {
        alert("Email already exists");
      });
  };

  useEffect(()=>{
    let token = sessionStorage.getItem('token')
    if(token){
      router.push('/home');
      console.log(token);
    }
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.title}>
        Register
        <input
          placeholder="Email"
          className={styles.inputBox}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
        />
        <input
          placeholder="Password"
          className={styles.inputBox}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />
        <button className={styles.button} onClick={signup}>
          Sign Up
        </button>
        <hr />
        <button className={styles.googleAlt} onClick={signUpWithGoogle}>
          Sign Up with Google
        </button>
        <hr />
        <button onClick={signUpWithGithub} className={styles.googleAlt}>
          Sign Up with Github
        </button>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
