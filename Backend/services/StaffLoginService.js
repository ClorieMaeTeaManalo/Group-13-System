
import * as staffLoginModel from '../models/StaffLoginModel.js';

// Staff Login
export const loginStaff = async (email, password) => {

    // Check required fields
    if (!email || !password) {
        throw new Error('Email and password are required!');
    }

    // Check staff login
    const staff = await staffLoginModel.loginStaff(
        email,
        password
    );

    if (!staff) {
        throw new Error('Invalid email or password!');
    }

    return staff;
};
