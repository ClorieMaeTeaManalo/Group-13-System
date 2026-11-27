import db from '../config/db.js';

// Display sa assigned cleaning tasks
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
            c.name AS customer_name,
            c.contact_number AS phone
        FROM cleaning_reports cr
        LEFT JOIN reservations r
            ON cr.reservation_id = r.reservation_id
        LEFT JOIN customers c
        ON r.customer_id = c.customer_id
        WHERE cr.staff_id = ?
        ORDER BY cr.created_at DESC
    `;

    const [result] = await db.query(sql, [staffId]);

    return result;
};
