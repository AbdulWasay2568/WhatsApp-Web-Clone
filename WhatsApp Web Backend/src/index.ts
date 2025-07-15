// index.ts
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { initSocket } from './socket'; // import initSocket function here
import { userRouter, authRouter, messageRouter, reactionRouter, replyRouter, callRouter, chatRouter, uploadRouter } from './api/routes/index';

dotenv.config({ path: '.env' });
const app: Express = express();
const httpServer = createServer(app);

// Initialize socket.io using httpServer
const io = initSocket(httpServer);

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

// Parse JSON body
app.use(express.json());

// Prisma Client
export const prismaClient = new PrismaClient({
  log: ['query'],
});

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('WhatsApp backend is running!');
});

// Register routers
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/reaction', reactionRouter);
app.use('/replies', replyRouter);
app.use('/calls', callRouter);
app.use('/chats', chatRouter);
app.use('/upload', uploadRouter);

httpServer.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
