import Head from "next/head";
import styles from "../styles/Home.module.css";
import { app,database } from "../firebaseConfig";
import { useEffect, useState } from "react";
import Router from "next/router";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [ID, setID] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [fireData, setFireData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const databaseRef = collection(database, 'CRUD DATA');
  let router = Router;


  useEffect(() => {
    let token = sessionStorage.getItem('Token')
    if (token) {
      getData()  
      }
    if (!token) {
      router.push('/register')
    }
  }, [])

 const addData = () =>{
  addDoc(databaseRef, {
    name: name,
    age: Number(age)
  })
   .then(()=>{
    alert('Data sent')
    getData()
    setName('')
    setAge(null)
   })
   .catch(()=>{
    console.log('Error')
   })

 }

const getData =()=>{
  getDocs(databaseRef)
  .then((response)=>{
    setFireData(response.docs.map((data)=>{
      return {...data.data(),id:data.id}
    }))
  })
}

const getID = (id, name, age) => {
  setID(id)
  setName(name)
  setAge(age)
  setIsUpdate(true)
}
const updateFields = () => {
  let fieldToEdit = doc(database, 'CRUD DATA', ID);
  updateDoc(fieldToEdit, {
    name: name,
    age: Number(age)
  })
  .then(() => {
    alert('Data Updated')
    setName('')
    setAge(null)
  })
  .catch((err) => {
    console.log(err);
  })
}
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Home</h1>

        <input
          className={styles.inputBox}
          placeholder="name"
          type="text"
          value={name}
          onChange ={event => setName(event.target.value)}
        />
        <input
          className={styles.inputBox}
          placeholder="age"
          type="number"
          value={age}
          onChange ={event => setAge(event.target.value)}

        />
      
      {isUpdate ? (
          <button
            className={styles.button}
            onClick={updateFields}
          >
            UPDATE
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={addData}
          >
            ADD
          </button>
        )}


        <div>
          {fireData.map((data)=>{
            return (
              <div key={data.id} className={styles.flex}>
              <h2>{data.name}</h2>
              <p>{data.age}</p>
              <button className={styles.button}
               onClick={()=>getID(data.id,data.name, data.age )}
              >update</button>
              </div>
            )

          })}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

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
