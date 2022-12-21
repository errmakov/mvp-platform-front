import NextAuth, { NextAuthOptions } from "next-auth"
import { NextApiRequest, NextApiResponse } from 'next'
import CredentialsProvider from 'next-auth/providers/credentials';


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
          email: credentials?.username,
          password: credentials?.password,
          scope: 'web',
          grant_type:  'password'
        };

        console.log('Going authorize')
        const res = await fetch(process.env.API_URL + '/api/oauth/token', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + process.env.AUTH_BASIC_TOKEN
          },
        });

        const user = await res.json();
        console.log('User: ', user)
        return user
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