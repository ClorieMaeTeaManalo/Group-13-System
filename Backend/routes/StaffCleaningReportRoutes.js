import express from 'express';
import * as staffReportController from '../controllers/StaffCleaningReportController.js';

const router = express.Router();

// Submit cleaning report
router.post(
    '/cleaning-tasks/:cleaningId/report',
    staffReportController.submitCleaningReport
);

// Get submitted cleaning reports
router.get(
    '/cleaning-reports/:staffId',
    staffReportController.getCleaningReports
);

export default router;
