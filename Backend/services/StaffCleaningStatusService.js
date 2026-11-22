import * as staffStatusModel from '../models/StaffCleaningStatusModel.js';

// Update sa cleaning task status
export const updateCleaningTaskStatus = async (cleaningId, staffId, status) => {

    // Allowed statuses
    const allowedStatuses = ['pending', 'in_progress', 'completed'];

    // Check kung valid ang status
    if (!allowedStatuses.includes(status)) {
        throw new Error('Invalid status!');
    }

    // Update status sa database
    return await staffStatusModel.updateCleaningTaskStatus(
        cleaningId,
        staffId,
        status
    );
};

