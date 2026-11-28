import * as paymentModel from '../models/paymentModel.js';

// Get all resort payment information
export const getPaymentInfo = async () => {
  return await paymentModel.getPaymentInfo();
};

// Save or update resort payment information
export const savePaymentInfo = async (
  paymentMethod,
  accountName,
  accountNumber,
  qrImage
) => {

  // Check if the payment method is valid
  const validMethods = ['GCash', 'Maya', 'MariBank'];

  if (!validMethods.includes(paymentMethod)) {
    throw new Error('Invalid payment method.');
  }

  // Check if at least one payment detail is provided
  if (!accountName && !accountNumber && !qrImage) {
    throw new Error('Please provide payment information.');
  }

  // Save the payment information
  return await paymentModel.savePaymentInfo(
    paymentMethod,
    accountName,
    accountNumber,
    qrImage
  );
};
