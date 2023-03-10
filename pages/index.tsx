import Head from 'next/head'
import MenuCards from '../components/common/menu-cards'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <>
      <Head>
        <title>MVP Platform App</title>
        <meta name="description" content="Foo Bar Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          MVP Platform App
        </div>
        <MenuCards isSigned={(!session) ? false : true}/>
      </main>
    </>
  )
}
