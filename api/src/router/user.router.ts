import express from 'express';
import { deleteUser } from '../controller/user.controller';
import isOwnerMiddleware from '../middleware/isOwner.middleware';

export default (router: express.Router) => {
   router.delete('/user/:id', isOwnerMiddleware, deleteUser);
};
