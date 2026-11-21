
import * as staffService from '../services/staffService.js';

export const getCleaningTasks = async (req, res) => {
    const { staffId } = req.params;

    try {
        const result = await staffService.getCleaningTasks(staffId);

        res.status(200).json({
            success: true,
            message: 'Cleaning tasks retrieved successfully',
            data: result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve cleaning tasks'
        });
    }
};

// Sa update ng cleaning task status
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

        const result = await staffService.updateCleaningTaskStatus(
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