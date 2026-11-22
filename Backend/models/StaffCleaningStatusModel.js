import db from '../config/db.js';

// Update cleaning task status
export const updateCleaningTaskStatus = async (cleaningId, staffId, status) => {

    // Check kung assigned sa staff ang task
    const [tasks] = await db.query(
        'SELECT * FROM cleaning_reports WHERE cleaning_id = ? AND staff_id = ?',
        [cleaningId, staffId]
    );

    if (tasks.length === 0) {
        return false;
    }

    // Update ang task status
    await db.query(
        'UPDATE cleaning_reports SET status = ? WHERE cleaning_id = ? AND staff_id = ?',
        [status, cleaningId, staffId]
    );

    return true;
};

