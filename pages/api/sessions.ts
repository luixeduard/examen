// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createFirstUser, getUser } from '@/libs/users';
import validate from '@/services/authService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLowerCase();
  const { email, pass } = req.body;
  if (method !== "post") {
    return res.status(405).end(`Method ${req.method} NOT ALLOWED`);
  }

  try {
    const userCred = await getUser(email) as any;
    console.log(userCred)
    if (userCred) {
      
      
      const bool = await validate(pass, userCred.pass)
      console.log(bool)
      if (bool) {
        console.log(bool)
      }  
    } else {
      res.status(404).json({res: "NOT FOUND"})
    }
    
  } catch (err) {
    //console.log(err);
  }

}