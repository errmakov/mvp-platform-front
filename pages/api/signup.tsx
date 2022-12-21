import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message?: string
    error?: string
}

export default async function signup(req: NextApiRequest, resp: NextApiResponse<ResponseData>) {
    const payload = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        fullname: req.body.fullname,
      };
console.log('payload:', payload)
      try {

      const res = await fetch(process.env.API_URL + '/api/oauth/profile', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        resp.status(200).json({message: 'Congrats!'})
      } else {
        resp.status(500).json({error: 'Something goes wrong'})
      }
      } catch(e) {
        console.log(e)
      }
    
}