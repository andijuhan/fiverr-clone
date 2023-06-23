import express from 'express';
import prisma from '../utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const deleteUser = async (
   req: express.Request,
   res: express.Response
) => {
   //check user id from req
   const userId = req.params.id;

   //check is user id empty
   if (!userId) {
      return res.status(404).json({ message: 'Invalid userID' });
   }

   try {
      //delete user by user id from req
      const deletedUser = await prisma.user.delete({
         where: {
            id: userId,
         },
      });

      return res.status(200).json(deletedUser).end();
   } catch (error) {
      console.log(error);
      //check is error instance of class PrismaClientKnownRequestError
      if (error instanceof PrismaClientKnownRequestError) {
         //check error code on prisma doc
         if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Invalid userID' });
         }
      }
      return res.status(500).json({ message: 'Something wrong' });
   }
};
