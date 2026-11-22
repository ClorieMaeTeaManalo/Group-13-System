import * as staffTaskModel from '../models/StaffCleaningTaskModel.js';

// Display assigned cleaning tasks
export const getCleaningTasks = async (staffId) => {
    return await staffTaskModel.getCleaningTasks(staffId);
};
