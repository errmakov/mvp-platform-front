import Head from 'next/head'
import MenuCards from '../components/common/menu-cards'
import styles from '../styles/Home.module.css'
import stylesForm from '../styles/Signup.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <>
      <Head>
        <title>MVP Platform App / Let's sign up</title>
        <meta name="description" content="Foo Bar Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          MVP Platform App / Sign up
        </div>
        <div className={stylesForm.form}>
            <form action='/api/signup'  method="post">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username"/>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"/>
            <label htmlFor="password">Password one more time</label>
            <input type="password" name="password_repeat" id="password_repeat"/>
            <input type="submit" value="Submit"/>
            </form>
        </div>
        <MenuCards isSigned={(!session) ? false : true}/>
      </main>
    </>
  )
}
