import Head from 'next/head'
import MenuCards from '../components/common/menu-cards'
import ProtectedContent from '../components/common/protected-content'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  //if (typeof window !== 'undefined' && status.loading) return null
  return (
    <>
      <Head>
        <title>MVP Platform App / Protected page</title>
        <meta name="description" content="Foo Bar Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          MVP Platform App
        </div>
        <div>
            <ProtectedContent isSigned={(!session) ? false : true}/>
        </div>
        <MenuCards isSigned={(!session) ? false : true}/>
      </main>
    </>
  )
  }
