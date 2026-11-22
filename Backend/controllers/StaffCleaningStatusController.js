import * as staffStatusService from '../services/StaffCleaningStatusService.js';

// Update sa cleaning task status
export const updateCleaningTaskStatus = async (req, res) => {

    const { cleaningId } = req.params;
    const { staffId, status } = req.body;

    try {

        if (!staffId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Staff ID and status are required!'
            });
        }

        const result = await staffStatusService.updateCleaningTaskStatus(
            cleaningId,
            staffId,
            status.toLowerCase()
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Cleaning task not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cleaning task status updated!'
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
