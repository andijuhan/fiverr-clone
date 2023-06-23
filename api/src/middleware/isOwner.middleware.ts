import express from 'express';
import { validateSessionToken } from '../helper';
import prisma from '../utils/prisma';
import { merge } from 'lodash';
import createHttpError from 'http-errors';
import errorHandle from './errorHandler.middleware';

//this moddleware to verify is request come from data owner

export default async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      //chek user id from req
      const userId = req.params.id;
      //check cookie from req
      const token = req.cookies.accessToken;

      //check is user id is empty
      if (!userId) {
         throw createHttpError(400, 'Invalid user id');
      }

      //chek is access token is empty
      if (!token) {
         throw createHttpError(401, 'You are not authenticated');
      }

      //check is token is valid
      const validateToken = validateSessionToken(token);

      if (!validateToken) {
         throw createHttpError(401, 'You are not authenticated');
      }
      //get detail user
      const currentUser = await prisma.user.findUnique({
         where: {
            id: userId,
         },
      });

      if (!currentUser) {
         throw createHttpError(404, 'User not found');
      }

      //check is session token from db is match with access token from req
      if (currentUser.sessionToken !== token) {
         throw createHttpError(401, 'You are not authenticated');
      }

      //add objec identity to req
      merge(req, { identity: currentUser });

      next();
   } catch (error) {
      errorHandle(error, req, res, next);
   }
};
