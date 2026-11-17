import * as adminAuthService from '../services/adminAuthService.js';

// Administrator Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminAuthService.loginAdmin(email, password);

    res.status(200).json({
      success: true,
      message: 'Administrator login successful!',
      admin
    });

  } catch (error) {

    if (error.message === 'Email and password are required!') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (error.message === 'Invalid email or password!') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    console.error('Administrator Login Error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};