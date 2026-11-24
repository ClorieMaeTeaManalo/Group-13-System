import * as staffReportModel from '../models/StaffCleaningReportModel.js';

// Submit cleaning report
export const submitCleaningReport = async (
    cleaningId,
    staffId,
    completedAt,
    roomCondition
) => {

    // Check required information
    if (!cleaningId || !staffId || !completedAt || !roomCondition) {
        throw new Error('All cleaning report information is required!');
    }

    // Save cleaning report
    return await staffReportModel.submitCleaningReport(
        cleaningId,
        staffId,
        completedAt,
        roomCondition
    );
};

// Get submitted cleaning reports
export const getCleaningReports = async (staffId) => {

    // Get cleaning reports
    return await staffReportModel.getCleaningReports(staffId);
};
