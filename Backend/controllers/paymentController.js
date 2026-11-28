import * as paymentService from '../services/paymentService.js';

// Get all resort payment information
export const getPaymentInfoController = async (req, res) => {
  try {
    const paymentInfo = await paymentService.getPaymentInfo();

    res.status(200).json({
      success: true,
      data: paymentInfo
    });

  } catch (error) {
    console.error('Get Payment Info Error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve payment information.'
    });
  }
};

// Save or update resort payment information
export const savePaymentInfoController = async (req, res) => {
  try {
    const { paymentMethod, accountName, accountNumber } = req.body;

    // Get the existing payment information
    const existingPayments = await paymentService.getPaymentInfo();

    // Find the selected payment method
    const existingInfo = existingPayments.find(
      (payment) => payment.payment_method === paymentMethod
    );

    // Keep the old QR image if no new image is uploaded
    const qrImage = req.file
      ? req.file.filename
      : existingInfo?.qr_image || null;

    // Save the payment information
    await paymentService.savePaymentInfo(
      paymentMethod,
      accountName,
      accountNumber,
      qrImage
    );

    res.status(200).json({
      success: true,
      message: paymentMethod + ' payment information saved successfully!'
    });

  } catch (error) {
    console.error('Save Payment Info Error:', error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};