import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  // GoogleAuthProvider,
  // GithubAuthProvider,
  // signInWithPopup
} from "firebase/auth";

export default function Login() {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const signup = () =>{
      // const email = document.getElementById("email").value;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.title}>
        Login
        <input
                    placeholder='Email'
                    className={styles.inputBox}
                    onChange={(event) => setEmail(event.target.value)}
                     value={email}
                    type='email'
                />
                <input
                    placeholder='Password'
                    className={styles.inputBox}
                     onChange={(event) => setPassword(event.target.value)}
                     value={password}
                    type='password'
                />
  <button className={styles.button}
                    // onClick={signUp}
                >SigIn</button>
<hr/>

<button>
    Sign Up with Google
</button>
<hr/>
<button>
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
  )
}
