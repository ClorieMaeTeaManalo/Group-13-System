import express from 'express';
import * as staffStatusController from '../controllers/StaffCleaningStatusController.js';

const router = express.Router();

// Update cleaning task status
router.put(
    '/cleaning-tasks/:cleaningId/status',
    staffStatusController.updateCleaningTaskStatus
);

export default router;
