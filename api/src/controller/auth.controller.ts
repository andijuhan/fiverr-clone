import express from 'express';
import prisma from '../utils/prisma';
import * as argon2 from 'argon2';
import { createSessionToken } from '../helper';

export const register = async (req: express.Request, res: express.Response) => {
   const { username, email, password, img, country, phone, desc, isSeller } =
      req.body;

   //check is required fields empthy?
   if (!username || !email || !password || !country) {
      return res.status(400).json({ message: 'field not empty' });
   }

   //encryp user pass
   const hash = await argon2.hash(password);
   const isUserExist = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   //check is user already register
   if (isUserExist) {
      return res.status(409).json({ message: 'User already exist' });
   }

   try {
      const user = await prisma.user.create({
         data: {
            username,
            email,
            password: hash,
            img,
            country,
            phone,
            desc,
            isSeller,
         },
      });

      return res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
};

export const login = async (req: express.Request, res: express.Response) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({ message: 'Field not empty' });
   }

   try {
      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      const isPasswordMatch = await argon2.verify(user.password, password);

      if (!isPasswordMatch) {
         return res.status(401).json({ message: 'Password not match' });
      }

      //create session token
      const sessionToken = createSessionToken(user.email, user.isSeller);

      //save session token to db
      await prisma.user.update({
         where: {
            email,
         },
         data: {
            sessionToken,
         },
      });

      //attach token with res cookie
      res.cookie('accessToken', sessionToken, {
         domain: 'localhost',
         path: '/',
         httpOnly: true,
      });

      delete user.password;

      return res.status(200).json(user);
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
};

export const logout = async (req: express.Request, res: express.Response) => {
   try {
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
};
