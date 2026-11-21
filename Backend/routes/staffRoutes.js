
import express from 'express';
import * as staffController from '../controllers/staffController.js';

const router = express.Router();

router.get('/cleaning-tasks/:staffId', staffController.getCleaningTasks);

// Update cleaning task status
router.put('/cleaning-tasks/:cleaningId/status', staffController.updateCleaningTaskStatus);

export default router;
