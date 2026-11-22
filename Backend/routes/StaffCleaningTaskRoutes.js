import express from 'express';
import * as staffTaskController from '../controllers/StaffCleaningTaskController.js';

const router = express.Router();

// Display assigned cleaning tasks
router.get(
    '/cleaning-tasks/:staffId',
    staffTaskController.getCleaningTasks
);

export default router;
