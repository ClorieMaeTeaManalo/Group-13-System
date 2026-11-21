
import * as staffModel from '../models/staffModel.js';

export const getCleaningTasks = async (staffId) => {
    return await staffModel.getCleaningTasks(staffId);
};

// Update cleaning task status
export const updateCleaningTaskStatus = async (cleaningId, staffId, status) => {

    // Allowed statuses
    const allowedStatuses = ['pending', 'in_progress', 'completed'];

    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid status!');
    }

    return await staffModel.updateCleaningTaskStatus(
        cleaningId,
        staffId,
        status
    );
};