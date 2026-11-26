
import Customer from "../models/Customer.js";

// Retrieve currently logged-in customer profile
export const getCustomerProfile = async (req, res) => {
  try {
    const customerId = req.customer.customer_id;

    const customer = await Customer.findProfileById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer profile not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer profile retrieved successfully.",
      customer
    });

  } catch (error) {
    console.error("Get Customer Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve customer profile."
    });
  }
};

// Update currently logged-in customer profile
export const updateCustomerProfile = async (req, res) => {
  try {
    const customerId = req.customer.customer_id;
    const { name, contact_number } = req.body;

    if (!name || !contact_number) {
      return res.status(400).json({
        success: false,
        message: "Name and contact number are required."
      });
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters."
      });
    }

    const normalizedContact = String(contact_number).trim();
    const contactRegex = /^\+?[0-9]{10,15}$/;

    if (!contactRegex.test(normalizedContact)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid contact number."
      });
    }

    await Customer.updateProfileById(customerId, {
      name: name.trim(),
      contact_number: normalizedContact
    });

    const updatedCustomer = await Customer.findProfileById(customerId);

    return res.status(200).json({
      success: true,
      message: "Customer profile updated successfully.",
      customer: updatedCustomer
    });

  } catch (error) {
    console.error("Update Customer Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update customer profile."
    });
  }
};
