import NextAuth, { NextAuthOptions } from "next-auth"
import { NextApiRequest, NextApiResponse } from 'next'
import axios, {AxiosResponse, AxiosRequestConfig} from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'
import queryString from 'querystring'


export const options: NextAuthOptions  = {

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'MPV Platform',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
        },
        password: { label: 'Password', type: 'password' },

      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials?.username,
          password: credentials?.password,
          scope: "web",
          grant_type:  "password"
        }
        console.log('Going authorize')
        return axios.post(process.env.API_URL + '/api/oauth/token', queryString.stringify(payload),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Authorization': 'Basic ' + process.env.API_AUTH_BASICTOKEN
          },
          })
          .then((resp) => {
              console.log('process.env.API_URL: ', process.env.API_URL + '/api/oauth/token')
              console.log('process.env.API_AUTH_BASICTOKEN: ', process.env.API_AUTH_BASICTOKEN)
              console.log('JSON.stringify(payload): ', queryString.stringify(payload))
              console.log('Authorize req: ', req)
              const user = resp.data
              console.log('User: ', user)
              return user            
          })
          .catch((e)=>{
              console.log(e)
              return false
          })
        
      },
    }),
  ],
  
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    //signIn: '/signin',
  },
  callbacks: {
    async signIn({user}) {
      try {
        console.log('SignIn callback, user: ', user)
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    async redirect({ url, baseUrl }) {
      
      if (url.startsWith("/")) return `${baseUrl}${url}`
      
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  
  } 
}
const nextAuth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)
export default nextAuth