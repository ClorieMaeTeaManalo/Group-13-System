
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
