
import express from 'express';
import * as staffController from '../controllers/staffController.js';

const router = express.Router();

router.get('/cleaning-tasks/:staffId', staffController.getCleaningTasks);

export default router;
