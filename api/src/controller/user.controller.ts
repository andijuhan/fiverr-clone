import express from 'express';
import prisma from '../utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { get } from 'lodash';
import createHttpError from 'http-errors';

export const deleteUser = async (
   req: express.Request,
   res: express.Response,
   next: express.NextFunction
) => {
   try {
      //check  user id from identity object in request
      const userId = get(req, 'identity.id');

      //check is user id empty
      if (!userId) {
         throw createHttpError(400, 'Invalid user id');
      }
      //delete user by user id from req
      const deletedUser = await prisma.user.delete({
         where: {
            id: userId,
         },
      });

      return res.status(200).json(deletedUser).end();
   } catch (error) {
      next(error);
   }
};
