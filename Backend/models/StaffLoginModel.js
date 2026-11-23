import db from '../config/db.js';
import bcrypt from 'bcrypt';

// Staff Login
export const loginStaff = async (email, password) => {

    // Check staff account
    const [rows] = await db.query(
        'SELECT * FROM staff WHERE email = ?',
        [email.trim()]
    );

    if (rows.length === 0) {
        console.log('Staff account not found!');
        return null;
    }

    console.log('Staff account found!');

    // Check password
    const staff = rows[0];

    const passwordMatch = await bcrypt.compare(
        password,
        staff.password
    )
    
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
        return null;
    }

    // Return staff information
    return {
        staff_id: staff.staff_id,
        name: staff.name,
        email: staff.email,
        role: staff.role
    };
};