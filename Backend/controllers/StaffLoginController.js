import * as staffLoginService from '../services/StaffLoginService.js';

// Staff Login
export const loginStaff = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Check staff login
        const staff = await staffLoginService.loginStaff(
            email,
            password
        );

        res.status(200).json({
            success: true,
            message: 'Staff login successful!',
            staff: staff
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};
