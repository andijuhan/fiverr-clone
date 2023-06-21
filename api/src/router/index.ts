import express from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';
import conversationRouter from './conversation.router';
import gigRouter from './gig.router';
import messageRouter from './message.router';
import orderRouter from './order.router';
import reviewRouter from './review.router';

const router = express.Router();

export default (): express.Router => {
   //define all routes here
   userRouter(router);
   authRouter(router);
   conversationRouter(router);
   gigRouter(router);
   messageRouter(router);
   orderRouter(router);
   reviewRouter(router);
   return router;
};
