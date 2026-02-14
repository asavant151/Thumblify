import express from 'express';
import { getUsersThumbnails, getThumbnailById } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails', protect, getUsersThumbnails);
UserRouter.get('/thumbnail/:id', protect, getThumbnailById);

export default UserRouter;