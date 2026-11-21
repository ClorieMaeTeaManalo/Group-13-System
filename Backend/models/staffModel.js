
import db from '../config/db.js';

export const getCleaningTasks = async (staffId) => {

    const sql = `
        SELECT
            cr.cleaning_id,
            cr.reservation_id,
            cr.description,
            cr.status,
            cr.created_at AS request_date,
            r.check_in,
            r.check_out,
            r.guests,
            u.name AS customer_name,
            u.phone
        FROM cleaning_reports cr
        LEFT JOIN reservations r
            ON cr.reservation_id = r.reservation_id
        LEFT JOIN users u
            ON r.user_id = u.user_id
        WHERE cr.staff_id = ?
        ORDER BY cr.created_at DESC
    `;

    const [result] = await db.query(sql, [staffId]);

    return result;
};


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