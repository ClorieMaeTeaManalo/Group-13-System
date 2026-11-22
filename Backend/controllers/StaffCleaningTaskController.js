import * as staffTaskService from '../services/StaffCleaningTaskService.js';

// Display sa assigned cleaning tasks
export const getCleaningTasks = async (req, res) => {

    const { staffId } = req.params;

    try {
        const result = await staffTaskService.getCleaningTasks(staffId);

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
