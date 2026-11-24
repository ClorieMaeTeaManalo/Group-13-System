import * as staffReportService from '../services/StaffCleaningReportService.js';

// Submit cleaning report
export const submitCleaningReport = async (req, res) => {
    const { cleaningId } = req.params;
    const { staffId, completedAt, roomCondition } = req.body;

    try {
        const result = await staffReportService.submitCleaningReport(
            cleaningId,
            staffId,
            completedAt,
            roomCondition
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Cleaning task not found or not assigned to this staff!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cleaning report submitted successfully!'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get submitted cleaning reports
export const getCleaningReports = async (req, res) => {
    const { staffId } = req.params;

    try {
        const result = await staffReportService.getCleaningReports(staffId);

        res.status(200).json({
            success: true,
            message: 'Cleaning reports retrieved successfully!',
            data: result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve cleaning reports!'
        });
    }
};
