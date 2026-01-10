import express from 'express';
import { getMessages,getUser,sendMessage } from '../Controller/message.controller.js';
import {protectRoute} from "../Middleware/auth.middleware.js";
const router=express.Router();
router.get('/users',protectRoute,getUser);
router.get('/:id', protectRoute, getMessages);
router.post('/:id',protectRoute,sendMessage);


export default router;