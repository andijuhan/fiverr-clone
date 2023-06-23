import express from 'express';
import { validateSessionToken } from '../helper';
import prisma from '../utils/prisma';

//this moddleware to verify is request come from data owner

export default async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   //chek user id from req
   const userId = req.params.id;
   //check cookie from req
   const token = req.cookies.accessToken;

   //check is user id is empty
   if (!userId) {
      return res.status(404).json({ message: 'Invalid userID' });
   }

   //chek is access token is empty
   if (!token) {
      return res.status(401).json({ message: 'You are not authenticated' });
   }

   //check is token is valid
   const validateToken = validateSessionToken(token);

   if (!validateToken) {
      return res.status(401).json({ message: 'You are not authenticated' });
   }

   try {
      //get detail user
      const currentUser = await prisma.user.findUnique({
         where: {
            id: userId,
         },
      });

      //check is session token from db is match with access token from req
      if (currentUser.sessionToken !== token) {
         return res.status(401).json({ message: 'You are not authenticated' });
      }

      next();
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something wrong' });
   }
};
