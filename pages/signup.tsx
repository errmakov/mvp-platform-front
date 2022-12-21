import Head from 'next/head'
import MenuCards from '../components/common/menu-cards'
import SignupResult from '../components/Signup/signup-result'
import styles from '../styles/Home.module.css'
import stylesForm from '../styles/Signup.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';


export default function Home() {
  const { data: session, status } = useSession()
  const [isSubmitDisabled, setIsSubmitDisable] = useState<boolean|undefined>(true);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [signupResult, setSignupResult] = useState<string|undefined>();

  const signupValidate = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if ((event.currentTarget.password.value == event.currentTarget.password_repeat.value) && event.currentTarget.password.value && event.currentTarget.password_repeat.value) {
        setIsSubmitDisable(false)
      } else {
        setIsSubmitDisable(true)
      }
  }

  const signupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
      setIsSubmitDisable(true)
      setIsFormLoading(true)
      const payload = {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        username: event.currentTarget.username.value,
        fullname: event.currentTarget.email.value,
      };
      const apiResp = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      console.log('apiResp: ', apiResp)
      if (apiResp.ok) {
        const data = await apiResp.json()
        console.log('res.data: ', data)
        setIsFormLoading(false);
        setSignupResult(data.message)
      } else {
        setIsFormLoading(false);
        setSignupResult('Something goes wrong')
      }
    }

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
            <form action='/api/signup'  method="post" onChange={signupValidate} onSubmit={signupSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required={true} minLength={8}/>
            <label htmlFor="fullname">Fullname</label>
            <input type="text" name="fullname" id="fullname" />
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required={true} minLength={8} />
            <label htmlFor="password">Password one more time</label>
            <input type="password" name="password_repeat" id="password_repeat" required={true} minLength={8}/>
            <input type="submit" value="Submit" disabled={isSubmitDisabled}/>
            </form>
            <SignupResult isFormLoading={isFormLoading} signupResult={signupResult}/>
        </div>
        <MenuCards isSigned={(!session) ? false : true}/>
      </main>
    </>
  )
}
