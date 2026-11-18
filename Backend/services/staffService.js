
import * as staffModel from '../models/staffModel.js';

export const getCleaningTasks = async (staffId) => {
    return await staffModel.getCleaningTasks(staffId);
};
