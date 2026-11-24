
import db from '../config/db.js';

// Submit cleaning report
export const submitCleaningReport = async (
    cleaningId,
    staffId,
    completedAt,
    roomCondition
) => {

    // Save cleaning report information
    const [result] = await db.query(
        `UPDATE cleaning_reports
         SET completed_at = ?, room_condition = ?
         WHERE cleaning_id = ? AND staff_id = ?`,
        [completedAt, roomCondition, cleaningId, staffId]
    );

    return result.affectedRows > 0;
};

// Get submitted cleaning reports
export const getCleaningReports = async (staffId) => {

    const [result] = await db.query(
        `SELECT
            cleaning_id,
            completed_at,
            room_condition
         FROM cleaning_reports
         WHERE staff_id = ?
         AND completed_at IS NOT NULL
         ORDER BY completed_at DESC`,
        [staffId]
    );

    return result;
};
