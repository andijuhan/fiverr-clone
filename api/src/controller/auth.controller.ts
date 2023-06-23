import express from 'express';
import prisma from '../utils/prisma';
import * as argon2 from 'argon2';
import { createSessionToken } from '../helper';
import createHttpError from 'http-errors';

export const register = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const { username, email, password, img, country, phone, desc, isSeller } =
         req.body;

      //check is required fields empthy?
      if (!username || !email || !password || !country) {
         throw createHttpError(400, 'field not empty');
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
         throw createHttpError(409, 'User already exist');
      }

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
      next(error);
   }
};

export const login = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         throw createHttpError(400, 'Field not empty');
      }
      const user = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (!user) {
         throw createHttpError(404, 'user not found');
      }

      const isPasswordMatch = await argon2.verify(user.password, password);

      if (!isPasswordMatch) {
         throw createHttpError(401, 'password not match');
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
      next(error);
   }
};

export const logout = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
   } catch (error) {
      next(error);
   }
};
